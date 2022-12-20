# Contributing

## Commands
### Get the benchmarks for a file given a minfier
```sh
$ pnpm benchmark --minifier <minifier> <code-path>
```

Example:
```
$ pnpm benchmark --minifier esbuild ./node_modules/vue/dist/vue.runtime.common.dev.js
```

### Benchmark all artifacts & minifiers

```sh
$ pnpm benchmark-all
```

#### Limit by minifier
```sh
$ pnpm benchmark-all --minifier esbuild
```

#### Limit by artifact
```sh
$ pnpm benchmark-all --artifact artifact-name
```

### Benchmark all artifacts & minifiers and update readme.md
```sh
$ pnpm update-benchmarks-readme
```

## Artifacts

All artifacts used for benchmarking are in [`/scripts/update-benchmarks-readme/artifact-paths.ts`](/scripts/update-benchmarks-readme/artifact-paths.ts).
