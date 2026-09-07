# GymAI Cloud Functions

TypeScript Firebase Cloud Functions — the secure boundary between the React
Native app and any AI provider. See `../SECURITY_KEY_MIGRATION.md` for the
credential-exposure background and `../GymAI_Workout_Engine_Audit.md` for the
full target architecture this is one step toward.

## What's here

```
src/
  index.ts                     barrel — exports every deployed function
  functions/
    chatWithCoach.ts           the callable function (auth + validation + logging wiring)
  services/
    aiService.ts                provider-agnostic facade: Cloud Function → aiService → Groq/OpenAI
    groqService.ts               Groq implementation (active by default)
    openAIService.ts             OpenAI implementation (present, not wired on by default)
  firestore/
    admin.ts, collections.ts, userRepository.ts
                                read-only helpers for future functions to access
                                a user's profile/plan/history — not used by
                                chatWithCoach yet, see "Scope" below
  utils/
    validation.ts               request payload validation (Step 8)
    errors.ts                   maps any error to a clean, client-safe HttpsError (Step 9)
    logging.ts                  structured, secret-free logging helpers (Step 10)
  types/chat.ts                 shared request/response/message types
  __tests__/                    jest unit tests (see "Testing" below)
```

## Scope — what this does and doesn't do

**Does:** give the app one secure, authenticated, validated, provider-agnostic
path to an AI chat completion (`chatWithCoach`), with the Groq key living only
in Secret Manager.

**Does not (by design, separate follow-up tasks):** workout-plan generation,
AI personalization, weekly regeneration, injury-aware exercise filtering, or
grounding the chatbot in the user's actual plan/history. `firestore/userRepository.ts`
exists so that follow-up work has a tested place to read from — `chatWithCoach`
does not call it yet.

## One-time setup (manual — cannot be automated from here)

1. **Install the Firebase CLI** if you don't have it: `npm install -g firebase-tools`.
2. **Log in**: `firebase login` (interactive browser OAuth).
3. **Confirm the project is on the Blaze (pay-as-you-go) plan.** Cloud
   Functions on the free Spark plan cannot make outbound network requests to
   third-party APIs (like Groq) at all — this is a hard platform requirement.
   Blaze still has a generous free monthly quota.
   https://console.firebase.google.com/project/gymai-e5a14/usage/details
4. **Install dependencies**: `cd functions && npm install`.
5. **Set the Groq secret** — this is what replaces the old `.env` value, and
   it is stored in Google Secret Manager, not in any file in this repo:
   ```
   firebase functions:secrets:set GROQ_API_KEY
   ```
   Paste the **new, rotated** Groq key (see `../SECURITY_KEY_MIGRATION.md` —
   do not reuse the old exposed key).
6. **Build**: `npm run build` (compiles `src/**/*.ts` to `lib/`). `firebase deploy`
   also runs this automatically via the `predeploy` hook in `firebase.json`.
7. **Deploy**: `npm run deploy` (equivalent to `firebase deploy --only functions`).
8. **Rebuild the mobile app** after `npm install` at the project root (for
   `@react-native-firebase/functions`) and, on iOS, `cd ios && pod install`.

Until steps 1–7 are done, the chat feature in the app will not work — that's
expected, it's the point of the migration.

## Local development (emulator)

`firebase.json` configures the Functions, Auth, and Firestore emulators
(ports 5001/9099/8080, emulator UI on 4000). To run against them instead of
production:
```
npm run build
firebase emulators:start
```
Point the mobile app at the emulator during development by calling
`functions().useEmulator('localhost', 5001)` (and the equivalent for
`auth()`/`firestore()`) before making any calls — not wired up by default so
production behavior is unaffected.

Secrets aren't available in the emulator unless you also set up a local
`.secret.local` file (gitignored) — see
https://firebase.google.com/docs/functions/config-env#local-secret for the
current instructions if you need to test `chatWithCoach` end-to-end locally
against real Groq calls.

## Testing

```
cd functions
npm install
npm test
```

Runs Jest (via `ts-jest`) against `src/__tests__/`:
- `validation.test.ts` — request payload validation (valid/empty/malformed/oversized/extra-fields).
- `groqService.test.ts` — the Groq service in isolation (success, missing secret, 429, 5xx, malformed body, timeout, network failure) with `fetch` mocked, no real network or secret needed.
- `chatWithCoach.test.ts` — the callable handler in isolation, with `aiService` mocked: authentication (rejects missing auth, accepts authenticated calls, always uses `request.auth.uid` even if the payload includes a spoofed `userId`), input validation end-to-end, and every `AIProviderError` category mapping to the right client-facing `HttpsError` without leaking provider/secret details.

No test calls a real AI provider or requires a deployed function or the
emulator — they test the TypeScript source directly.

## Switching AI providers later

`services/aiService.ts` picks the active provider from the `AI_PROVIDER`
Functions param (default `"groq"`). To switch to OpenAI:
1. Rotate/obtain a real OpenAI key and run `firebase functions:secrets:set OPENAI_API_KEY`.
2. Add `OPENAI_API_KEY` (imported from `services/openAIService.ts`) to `chatWithCoach`'s `secrets: [...]` array in `src/functions/chatWithCoach.ts`.
3. Deploy with `--set-params AI_PROVIDER=openai` (or set it in `.env.<project>` per the [Functions params docs](https://firebase.google.com/docs/functions/config-env)).
No other function code needs to change — that's the point of the abstraction.

## Security notes

- The Groq key that used to live in the app's `.env` file must be treated as
  **compromised** (it was compiled into every build of the app) and rotated
  before being set as this function's secret.
- Secrets are injected into the function's environment only at invocation
  time by Secret Manager — never written to this repo, `firebase.json`, or
  any committed file, never logged, and never included in any response to
  the client (see `utils/errors.ts` / `utils/logging.ts` for how that's
  enforced in code).
