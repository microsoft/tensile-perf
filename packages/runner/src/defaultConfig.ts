import { ConfigFile } from "./types";

const defaultConfig: ConfigFile = {
    // List of files to test.
    file: undefined,

    // Tree size to test.
    size: 'm',

    // Test to run
    test: 'mount',

    // Browsers to test against
    browsers: undefined,

    // Number of test runs
    numRuns: 25,

    // Importmaps for your test.
    // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
    imports: {
        "@stress-test/tools": "/node_modules/@stress-test/tools/dist/index.js",
        "afterframe": "/node_modules/afterframe/dist/afterframe.module.js",
        "random-seedable": "/node_modules/random-seedable/src/index.js",
    },

    // Scripts to load before running the test.
    scripts: [],

    // Stylesheets to load before running the test.
    cssSheets: [],

    // Metrics to collect
    metrics: {
        // Memory usage. Not available in all browsers.
        // Can be quite slow to collect so it's off by default.
        memory: false,

        // Number of DOM nodes in the browser at the end of the test.
        domSize: true,
    },

    // Test parameters
    // parameters: {

    //     // RNG seed
    //     seed: 2,

    //     // Minimum tree breadth
    //     minBreadth: 1,

    //     // Maximum tree breadth
    //     maxBreadth: 1,

    //     // Minimum tree depth
    //     minDepth: 1,

    //     // Maximum tree depth
    //     maxDepth: 1,

    //     // Number of nodes in the tree
    //     targetSize: 1,
    // },
};

export { defaultConfig };