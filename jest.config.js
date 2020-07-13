module.exports = {
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        tsConfig: "tsconfig.jest.json",
      }
    },
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      '^@assets/(.*)$': '<rootDir>/src/assets/$1',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@costants/(.*)$': '<rootDir>/src/costants/$1',
      '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
      '^@src/(.*)$': '<rootDir>/src/$1',
    }
};