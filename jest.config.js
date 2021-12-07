module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/e2e'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  // ToDo: We should uncomment coverage threshold when setup process will be finished
  // coverageThreshold: {
  //   global: {
  //     statements: 95,
  //     branches: 95,
  //     lines: 95,
  //     functions: 95,
  //   },
  // },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|ts)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/test/setupEnzyme.ts'],
  moduleNameMapper: {
    '^react-select-search$': '<rootDir>/node_modules/react-select-search/dist/cjs/index.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/jest/__mocks__/fileMock.js',
    '^hocs(.*)$': '<rootDir>/src/atomic/hocs$1',
    '^atoms(.*)$': '<rootDir>/src/atomic/atoms$1',
    '^molecules(.*)$': '<rootDir>/src/atomic/molecules$1',
    '^organisms(.*)$': '<rootDir>/src/atomic/organisms$1',
    '^templates(.*)$': '<rootDir>/src/atomic/templates$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^stores(.*)$': '<rootDir>/src/stores$1'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', '/.next/', 'node_modules/(?!variables/.*)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  setupFiles: ['./jest.setup.js'],
  preset: 'ts-jest'
};
