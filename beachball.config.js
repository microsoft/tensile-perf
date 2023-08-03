// @ts-check

/**
 * @type {import('beachball').BeachballConfig}
 */
module.exports = {
    gitTags: false,
    ignorePatterns: [
      '**/__fixtures__/**',
      '**/*.test.{ts,tsx}',
      '**/*.stories.tsx',
      '**/.eslintrc.json',
      '**/jest.config.js',
      '**/project.json',
      '**/README.md',
    ],
    hooks: require('./beachball.hooks'),
    registry: "https://pkgs.dev.azure.com/uifabric/4ed167b9-ac3a-405b-b967-443af8db8961/_packaging/stress-test/npm/registry/",
    scopes: ["packages/*"]
  };
  