# \<scl-communication>

<img width="1506" alt="grafik" src="https://github.com/OpenEnergyTools/scl-editor/assets/66802940/ebb06f08-08c0-4b54-bb7c-3eed805eaf63">

## What is this?

This is an editor plugin for [open-scd-core](https://github.com/openscd/open-scd-core#readme), the new core editor engine for OpenSCD. With this plugin you can edit the element within the `Communication` section such as `SubNetwork`, `ConnectedAP`, `GSE` and `SMV`. Visit the [scl-editor](https://openenergytools.githuub.io/scl-editor) and see for yourself.

## Missing features

If you feel there is something missing you need please file an [issue](https://github.com/openenergytools/oscd-communication/issues).

> NOTE: This plugin is create with a general approach. We are not aiming to add user-specific automation here. Please keep that in mind when filing issues.

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

&copy; Jakob Vogelsang
