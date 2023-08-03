# @tensile-perf/web-components

Web Component and native HTML bindings for Tensile.

Use this if you are working with Web Components or plain HTML/CSS/Javascript.

## Usage

Install the package:

```shell
# with npm
$ npm install --save-dev @tensile-perf/web-components

# or with yarn
$ yarn add -D @tensile-perf/web-components
```

Create a benchmark test file:

```tsx
// Save in button.bench.ts
const itemRenderer = (): HTMLElement => {
  const btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Simple HTML Button'));
  
  return btn;
};

export default itemRenderer;
export { tests } from '@tensile-perf/web-components';
```

Transpile your TS to JS in ES module format (more on this below)

Run your test:

```shell
$ tensile --file button.bench.js
```

Review results in the `.tensile/` folder

### Advanced configuration

TODO

### ES modules

The [test runner](../runner/README.md) loads all Javascript test files as ES modules meaning all files under test must be loadable in a browsers as native ES modules. Because there are many bundlers and transpilers available (or maybe you write code as native ESM!), `tensile` doesn't prescribe how you get your code into this format.

Rollup is a popular bundler that supports exporting ESM.

The [Rollup config used for testing this library](./test/rollup.config.mjs) provides an example of using this option.

## Building

Run `yarn nx run web-components:build` to build the library.

**Trademarks** This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow Microsoft’s Trademark & Brand Guidelines. Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party’s policies.