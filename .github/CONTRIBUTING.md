# Contributing

## Commands
### Get the benchmarks for a file given a minfier
```sh
$ npm run benchmark -- --minifier <minifier> <code-path>
```

Example:
```
$ npm run benchmark -- --minifier esbuild ./node_modules/vue/dist/vue.runtime.common.dev.js
```

### Get the benchmarks for a file using all minifiers
```sh
$ npm run benchmark-all-minifiers <code-path>
```

Example:
```
$ npm run benchmark-all-minifiers ./node_modules/vue/dist/vue.runtime.common.dev.js
```

### Get benchmarks and update readme.md
```sh
$ npm run update-benchmarks-readme
```
