module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
      diagnostics: false
    }
  }
}
