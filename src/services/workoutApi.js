// workoutApi.js
//
// Thin HTTP client for the GymAI workout backend (Vercel-deployed Express
// server). Replaces the previous `httpsCallable(...)` calls against
// Firebase Cloud Functions. Same auth flow (Firebase ID token), same
// request/response shape, same error codes (we map the server's
// `{ error: { code, message } }` back to the Firebase `functions/{code}`
// shape so the rest of the app doesn't need to know we switched transport).
//
// The server URL comes from `EXPO_PUBLIC_API_URL` (build-time) or a
// hardcoded default for production. Update the default below when you
// deploy to Vercel — every release currently uses the same URL.

import auth from "@react-native-firebase/auth";

const DEFAULT_API_URL = "https://gymai-server.vercel.app";

function getApiUrl() {
  return process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL;
}

async function getIdToken() {
  const user = auth().currentUser;
  if (!user) {
    throw {
      code: "VALIDATION_ERROR",
      message: "Please log in and try again.",
    };
  }
  // `getIdToken(true)` forces a refresh — guarantees the token isn't
  // cached/expired when the user is mid-session.
  return user.getIdToken(true);
}

async function callWorkoutEndpoint(path, body = {}) {
  let idToken;
  try {
    idToken = await getIdToken();
  } catch (err) {
    throw err;
  }

  const url = `${getApiUrl()}${path}`;
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw {
      code: "NETWORK_ERROR",
      message: "Cannot reach the workout service. Check your internet.",
    };
  }

  let parsed;
  try {
    parsed = await response.json();
  } catch (err) {
    throw {
      code: "GENERATION_FAILED",
      message: "Workout service returned an invalid response.",
      details: "Please try again.",
    };
  }

  if (!response.ok || parsed.error) {
    const code = parsed?.error?.code || "internal";
    const message = parsed?.error?.message || "Workout service error.";
    // Surface using the same error code shape the app already understands
    // (legacy Firebase `functions/{code}` strings are still read by some
    // older call sites, so we mirror that prefix).
    throw {
      code: `functions/${code}`,
      message,
    };
  }

  return parsed.data;
}

export const callGenerateWorkoutPlan = () =>
  callWorkoutEndpoint("/api/generateWorkoutPlan", {});

export const callValidateWorkoutPlan = (dailyWorkouts) =>
  callWorkoutEndpoint("/api/validateWorkoutPlan", { dailyWorkouts });

export const callCheckWeeklyPlan = () =>
  callWorkoutEndpoint("/api/checkWeeklyPlan", {});
