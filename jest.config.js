process.env.NODE_ENV = 'test';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        '/node_modules/',
        'dist',
        'testHelpers.ts'
    ],
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 95,
            functions: 95,
            lines: 95,
            statements: -10,
        },
    },
};