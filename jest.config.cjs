/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  moduleNameMapper: {
    "^\\$lib/(.*)$": "<rootDir>/src/lib/$1",
    "^\\$routes/(.*)$": "<rootDir>/src/routes/$1",
    "^\\$app/(.*)$": "<rootDir>/.svelte-kit/dev/runtime/app/$1",
    "^\\@sveltejs/kit$": "<rootDir>/node_modules/@sveltejs/kit/types/index.d",
  },
  testPathIgnorePatterns: ["cypress/(.*)", "src/lib/components/(.*).test.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tests/tsconfig.json",
      },
    ],
  },
  resetMocks: true, // reset mocks before each test
  restoreMocks: true, // clears spies after each test
  coveragePathIgnorePatterns: [
    ".*.d.ts",
    ".*.types.ts",
    "/client-connectors/",
    "/connectors/",
    "/constants/",
    "/types/",
    "/hooks.server.ts",
    "/components/Section/index.ts",
    "/src/lib/config",
    "\\+.+ts$",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: -0,
    },
  },
};
