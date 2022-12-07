/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-env-setup.ts'],
  moduleNameMapper: {
    // 處理 import by alias (必須同步設定於 webpack.config.js -> resolve.alias)
    '^@app(.*)$': '<rootDir>/src/app$1',
    '^@modules(.*)$': '<rootDir>/src/modules$1',
    '^@views(.*)$': '<rootDir>/src/views$1',
    '^@shared(.*)$': '<rootDir>/src/shared$1',

    // 隔離掉所有 import 的 style 檔案
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  modulePaths: ['<rootDir>/src/'],
};
