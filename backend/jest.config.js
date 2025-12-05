export default {
  rootDir: '.',
  testEnvironment: 'node',

  setupFilesAfterEnv: [
    '<rootDir>/tests/setup-env.js',
    '<rootDir>/tests/setup-db.js'
  ],

  testMatch: ['<rootDir>/tests/**/*.test.js'],

  clearMocks: true,
  restoreMocks: true,

  transform: {}
}
