# Contributing

## Commands
### Get the benchmarks for a file given a minfier
```sh
$ pnpm bench --minifier <minifier> <artifact>
```

Example:
```
$ pnpm bench --minifier esbuild vue
```

### Benchmark all artifacts & minifiers

```sh
$ pnpm bench-all
```

#### Limit by minifier
```sh
$ pnpm bench-all --minifier esbuild
```

#### Limit by artifact
```sh
$ pnpm bench-all --artifact vue
```

### Benchmark all artifacts & minifiers and update README.md
```sh
$ pnpm update-readme
```

## Artifacts

All artifacts used for benchmarking are in [`/packages/artifacts/artifacts/`](/packages/artifacts/artifacts/).
