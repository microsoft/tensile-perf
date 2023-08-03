function getRollupOptions(/** @type {import('rollup').RollupOptions} */ options) {
    if (Array.isArray(options.output)) {
      throw new Error('"options.output" cannot be an array');
    }

    // Externalize 'random-seedable' as we need to 
    // conditionally import it based on the environment.
    const origOptsExternal = options.external;
    options.external = (id) => {
      if (id.includes('random-seedable') || id.includes('afterframe')) {
        return true;
      }

      return origOptsExternal(id);
    };

    options.output = {
      ...options.output,
      // Stops bundling to a single file and prevents bundle size issues
      preserveModules: true,
      preserveModulesRoot: 'src',
      // Enables sourcemaps
      sourcemap: true,
    };

    return options;
}
  
module.exports = getRollupOptions;
  