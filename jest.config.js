const { pathsToModuleNameMapper } = require('ts-jest/utils');
//const { compilerOptions } = require('./tsconfig.json');
const tsConfigPaths = {
    '@/*': ['src/*'],
    '@tests/*': ['tests/*'],
};

module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.graphql$': '<rootDir>/tests/graphql-loader.js',
    },
    testRegex: '(/__test__/.*|/tests/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/server/', '/fixtures/', 'tests/graphql-loader.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(tsConfigPaths, { prefix: `${__dirname}/` }),
        '^([./a-zA-Z0-9$_-]+\\.graphql)$': '<rootDir>/src/$1',
    },

    coverageDirectory: './coverage',
    coverageReporters: ['html', 'text'],
    collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**', '!**/vendor/**', '!**/dist/**', '!**/tests/**'],
};
