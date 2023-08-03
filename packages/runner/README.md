# @stress-test/runner

The application that runs Stress Tests tests. This application spins up a server, runs code and collects the results.

## Usage

Install the package:

```shell
# with npm
$ npm install --save-dev @stress-test/runner

# or with yarn
$ yarn add -D @stress-test/runner
```

Create a benchmark test file:

```tsx
// Save in button.bench.js
const itemRenderer = () => {
  const btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Simple HTML Button'));
  
  return btn;
};

export default itemRenderer;
export { tests } from '@stress-test/web-components';
```

Run your test:

```shell
$ stress-test --file button.bench.js
```

Review results in the `.stress-test/` folder

### Advanced configuration

TODO

## API

Use the CLI for help documentation:

```shell
$ stress-test help
```

## Building

Run `yarn nx run runner:build` to build the library.

**Trademarks** This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow Microsoft’s Trademark & Brand Guidelines. Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party’s policies.