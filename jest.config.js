module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ],
  moduleNameMapper: {
    '\\.(css|less|otf)$': '<rootDir>/tests/mocks/styleMock.js'
  }
}