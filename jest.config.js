module.exports = {
  "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "identity-obj-proxy"
    },
    "setupFiles": ["./source/setupTest.js"],
    "collectCoverageFrom": [
      "client/**/*.{js,jsx}",
    ],
    "testMatch": [ "**/client/tests/**/*.test.js?(x)", "**/?(*.)+(spec|test).js?(x)" ],
    "coveragePathIgnorePatterns": ["./client/index.js", "./client/history.js",
    "./client/public/index_bundle.js", "./client/public/index_bundle.js.map", "./client/public/index.html"]
}
