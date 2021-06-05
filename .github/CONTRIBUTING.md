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

### Benchmark artifacts and update readme.md
```sh
$ npm run update-benchmarks-readme
```

## Artifacts

All artifacts used for benchmarking are in [`/scripts/update-benchmarks-readme/artifact-paths.ts`](/scripts/update-benchmarks-readme/artifact-paths.ts).
