module.exports = {
    testEnvironment: "node",
    testMatch: [
        "**/tests/**/*.test.ts",
    ],
    setupFilesAfterEnv: [
        "<rootDir>/tests/setup.ts",
    ],
    clearMocks: true,
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.test.json",
            },
        ],
    },
};