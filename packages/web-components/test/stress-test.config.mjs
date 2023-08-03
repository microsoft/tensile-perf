const config = {
  // Tree size to test.
  size: 'm',

  // Browsers to test against
  browsers: [ 'chrome' ],

  // Number of test runs
  numRuns: 2,

  // Importmaps for your test.
  // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
  imports: {
    "@stress-test/web-components": "/node_modules/@stress-test/web-components/dist/index.js",
  },
};

export default config;