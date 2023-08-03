# Tensile

A tool that generates large, stressful DOM and CSS for benchmarking.

## Usage

While there are several [packages](./packages) in this monorepo there are two of primary interest for folks looking to performance test UI components:

1. [React](./packages/react/README.md)
2. [Web Components/Vanilla HTML](./packages/web-components/README.md)

### Development

Make sure you have `yarn` installed globally:

    $ npm i -g yarn

This project is a monorepo that uses <a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer">Nx</a> for workspace management.
All commands in this repository should be run from the repository's root folder (the folder where this README lives). See the Nx documentation for more details.

Install all dependencies:

```shell
$ yarn
```

Build the workspace for development:

```shell
$ yarn build
```

Run React tests:

```shell
$ yarn nx run react:test
```

Run Web Component tests:

```shell
$ yarn nx run web-components:test
```

**Trademarks** This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow Microsoft’s Trademark & Brand Guidelines. Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party’s policies.