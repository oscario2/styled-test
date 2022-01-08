const dotenv = require('dotenv');
dotenv.config();

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom', // 'node'
  globals: {
    'ts-jest': {
      isolatedModules: true,
      allowJs: true,
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules', 'lib'],
  modulePaths: ['<rootDir>'], // baseUrl in tsconfig.json
  collectCoverage: process.env.COVERAGE === '1',
};
