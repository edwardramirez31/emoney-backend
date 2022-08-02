module.exports = {
  coverageReporters: ['lcov', 'clover'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  setupFiles: ['<rootDir>/jest.setup.env.js'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\/styles\\.(css|sass|scss)$': 'identity-obj-proxy',
    '@handlers.types': '<rootDir>/src/handlers/handlers.types.ts'
  },
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.(ts|tsx|js)$': ['babel-jest', { configFile: './babel.test-config.js' }]
  },
  // transformIgnorePatterns: [`/node_modules/(?!${['node-fetch', 'node:http'].join('|')})`],
  testMatch: ['**/__tests__/*.(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['./.serverless', './.webpack', './node-modules'],
  modulePathIgnorePatterns: ['./.serverless', './.webpack', './node-modules']
};
