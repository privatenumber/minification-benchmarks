# Contributing

## Setup

- Use Node.js v26.13.0, as specified in `.nvmrc`, and the pnpm version in the root `package.json` `packageManager` field.
- Run `pnpm install` from the repository root.
- Install PHP and Composer, then run `composer install` in `packages/minifiers` for `tedivm/jshrink`.
- Install Java 21 for `google-closure-compiler`.
- `@cminify/cminify-linux-x64` runs only on Linux x64.

Run the commands below from the repository root.

## Benchmark

Benchmark one minifier and artifact:

```sh
pnpm bench --minifier esbuild --artifact vue
```

- `--minifier`, `-m`: minifier name (required).
- `--artifact`, `-a`: artifact name (required).
- `--instance`, `-i`: minifier instance name, required when the minifier has multiple instances.
- `--save`, `-s`: save the minified code under `results/<artifact>/<minifier>/`.

Benchmark all artifacts and minifier instances:

```sh
pnpm bench-all
```

- `--artifact`, `-a`: filter artifact names by pattern.
- `--minifier`, `-m`: filter minifier or instance names by pattern.
- `--runs`, `-r`: number of runs per benchmark (default: 5).
- `--force`, `-f`: rerun benchmarks even when results exist.
- `--sort`, `-s`: sort the saved data.

Results are stored in `packages/data/data/data.json`. Matching results are skipped unless `--force` is set.

## Update the README

```sh
pnpm update-readme
```

This regenerates `README.md` from the saved results and minifier metadata; it does not run benchmarks. To include AI analysis, set `OPENCODE_GO_API_KEY` in `.env` (see `.env.example`). Without the key, AI analysis is skipped.

## Add a minifier

Add a file or directory under `packages/minifiers/minifiers/` that default-exports `createMinifier(packageName, instances)`. Add its dependency to `packages/minifiers/package.json` and its package name to the minifiers list in `renovate.json`.

## Add an artifact

Add `packages/artifacts/artifacts/<name>/index.ts` that default-exports `defineArtifact({ package, filePath })`, and a `test.ts` that default-exports a `defineTest` test. Add the pinned artifact dependency to `packages/artifacts/package.json`. See `packages/artifacts/artifacts/vue/` for an example.
