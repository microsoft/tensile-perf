const config = {
  // Tree size to test.
  size: 'm',

  // Test to run
  test: 'mount',

  // Browsers to test against
  browsers: [ 'chrome' ],

  // Number of test runs
  numRuns: 2,

  extends: "./stress-test.base.mjs"
};

// module.exports = config;
export default config;