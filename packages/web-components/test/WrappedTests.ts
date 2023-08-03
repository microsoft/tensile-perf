// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { tests } from '@stress-test/web-components';
import { webLightTheme  } from '@fluentui/tokens';
import { DesignToken } from "@microsoft/fast-foundation";
import { setTheme } from "@fluentui/web-components";

const testWrapper = (test, args) => {
    
    DesignToken.registerDefaultStyleTarget();
    setTheme(webLightTheme);
    return test(args);
};

const wrappedTests = {};

for (const testName of Object.keys(tests)) {
    const test = tests[testName];

    wrappedTests[testName] = (args) => {
        return testWrapper(test, args);
    };
}

export { wrappedTests as tests };