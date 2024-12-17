
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.js?$": "babel-jest",
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/src/__tests__/",
  ],
  fakeTimers: { enableGlobally: true },
};
