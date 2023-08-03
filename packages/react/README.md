# @stress-test/react

React bindings for Stress Test.

## Usage

Install the package:

```shell
# with npm
$ npm install --save-dev @stress-test/react

# or with yarn
$ yarn add -D @stress-test/react
```

Create a benchmark test file:

```tsx
// Save in button.bench.tsx
import * as React from 'react';

const itemRenderer: React.FC = () => {
  return <button>React button</button>;
};

export default itemRenderer;

export { tests } from "@stress-test/react";
```

Transpile your TSX to JS in ES module format (more on this below)

Run your test:

```shell
$ stress-test --file button.bench.js
```

Review results in the `.stress-test/` folder

### Advanced configuration

TODO

### ES modules

The [test runner](../runner/README.md) loads all Javascript test files as ES modules meaning all files under test must be loadable in a browsers as native ES modules. Because there are many bundlers and transpilers available (or maybe you write code as native ESM!), `stress-test` doesn't prescribe how you get your code into this format.

Webpack is a popular bundler in the React world that supports exporting ESM via the experimental [`outputModule`](https://webpack.js.org/configuration/experiments/#experimentsoutputmodule) configuration option.

The [Webpack config used for testing this library](./test/webpack.config.js) provides an example of using this option.

## Building

Run `yarn nx run react:build` to build the library.

**Trademarks** This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow Microsoft’s Trademark & Brand Guidelines. Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party’s policies.
