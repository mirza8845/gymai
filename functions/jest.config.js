/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src",
  testMatch: ["**/__tests__/**/*.test.ts"],
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/../tsconfig.test.json",
      },
    ],
  },
  // `firebase-admin`'s auth verifier transitively pulls in `jwks-rsa` ->
  // `jose`, and current `jose` majors ship an ESM-only build with no CJS
  // fallback. Jest's CJS-based runtime can't `require()` that natively (Node
  // itself now can, which is why the actual deployed function is unaffected
  // — this is purely a test-tooling gap), so we let ts-jest transform that
  // one package instead of leaving it in the default node_modules ignore
  // list.
  transformIgnorePatterns: ["node_modules/(?!(jose)/)"],
};
