# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 👟 Methodology

- Each minifier is executed in its own process with a 1 minute timeout
- The measured time is an average taken from 5 consecutive runs
- Each table is sorted by smallest minified size in ascending order
- Each time is annotated with a multiplier relative to the fastest minifier
- _"Minzipped size"_ measures how well the minified file compresses with Gzip
- Minified artifacts can be downloaded and verified in each [action run](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml)

## 📋 Results

<!-- benchmarks:start -->
### [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1)
- Unminified size: `6.7 MB`
- Unminified Gzip size: `833.5 kB`

| Minifier                                 |                  Minified size |                   Minzipped size |                      Time |
| :--------------------------------------- | -----------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-65% </sup>`2.3 MB`** | **<sup>🏆-41% </sup>`491.2 kB`** | **<sup>🏆 </sup>`490ms`** |
----
### [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1)
- Unminified size: `555.8 kB`
- Unminified Gzip size: `130.5 kB`

| Minifier                                 |                    Minified size |                  Minzipped size |                     Time |
| :--------------------------------------- | -------------------------------: | ------------------------------: | -----------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-51% </sup>`270.2 kB`** | **<sup>🏆-31% </sup>`90.6 kB`** | **<sup>🏆 </sup>`86ms`** |
----
### [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1)
- Unminified size: `3.2 MB`
- Unminified Gzip size: `689.7 kB`

| Minifier                                 |                  Minified size |                   Minzipped size |                      Time |
| :--------------------------------------- | -----------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-68% </sup>`1.0 MB`** | **<sup>🏆-52% </sup>`331.7 kB`** | **<sup>🏆 </sup>`296ms`** |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                 |                   Minified size |                  Minzipped size |                     Time |
| :--------------------------------------- | ------------------------------: | ------------------------------: | -----------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-69% </sup>`90.2 kB`** | **<sup>🏆-62% </sup>`32.0 kB`** | **<sup>🏆 </sup>`36ms`** |
----
### [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21)
- Unminified size: `544.1 kB`
- Unminified Gzip size: `97.3 kB`

| Minifier                                 |                   Minified size |                  Minzipped size |                     Time |
| :--------------------------------------- | ------------------------------: | ------------------------------: | -----------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-87% </sup>`72.5 kB`** | **<sup>🏆-73% </sup>`26.1 kB`** | **<sup>🏆 </sup>`43ms`** |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                 |                   Minified size |                  Minzipped size |                     Time |
| :--------------------------------------- | ------------------------------: | ------------------------------: | -----------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-66% </sup>`59.9 kB`** | **<sup>🏆-47% </sup>`19.3 kB`** | **<sup>🏆 </sup>`28ms`** |
----
### [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1)
- Unminified size: `72.1 kB`
- Unminified Gzip size: `19.5 kB`

| Minifier                                 |                   Minified size |                 Minzipped size |                     Time |
| :--------------------------------------- | ------------------------------: | -----------------------------: | -----------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-67% </sup>`23.7 kB`** | **<sup>🏆-56% </sup>`8.6 kB`** | **<sup>🏆 </sup>`16ms`** |
----
### [terser v5.7.1](https://www.npmjs.com/package/terser/v/5.7.1)
- Unminified size: `870.0 kB`
- Unminified Gzip size: `174.6 kB`

| Minifier                                 |                    Minified size |                   Minzipped size |                     Time |
| :--------------------------------------- | -------------------------------: | -------------------------------: | -----------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-53% </sup>`412.2 kB`** | **<sup>🏆-32% </sup>`118.3 kB`** | **<sup>🏆 </sup>`84ms`** |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `249.0 kB`

| Minifier                                 |                    Minified size |                   Minzipped size |                      Time |
| :--------------------------------------- | -------------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-48% </sup>`647.0 kB`** | **<sup>🏆-34% </sup>`163.2 kB`** | **<sup>🏆 </sup>`146ms`** |
----
### [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4)
- Unminified size: `2.1 MB`
- Unminified Gzip size: `312.2 kB`

| Minifier                                 |                    Minified size |                   Minzipped size |                      Time |
| :--------------------------------------- | -------------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-66% </sup>`724.3 kB`** | **<sup>🏆-42% </sup>`180.5 kB`** | **<sup>🏆 </sup>`193ms`** |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                 |                   Minified size |                  Minzipped size |                     Time |
| :--------------------------------------- | ------------------------------: | ------------------------------: | -----------------------: |
| [esbuild](/scripts/minifiers/esbuild.js) | **<sup>🏆-57% </sup>`95.1 kB`** | **<sup>🏆-49% </sup>`31.8 kB`** | **<sup>🏆 </sup>`36ms`** |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome! See the [contribution guide](/.github/CONTRIBUTING.md) for more info.

## 🥇 Results

#### Best minification performance
[UglifyJS](https://github.com/mishoo/UglifyJS) takes first place for minification performance by winning 9 out of 11 races. When short, it only loses to Google Closure Compiler by less than `9 kB`! Impressively, it's still written in ES5 but can handle ES6 up to ES2020.

[Terser](https://github.com/terser/terser) takes a very close second, only short by at most by 1~2%. Terser is a fork of uglify-es and comes with support for ES6+.

#### Fastest minifier
[esbuild](https://github.com/evanw/esbuild) runs _10x_+ laps around everyone else! The Go-lang JS minifier/bundler is a beast of its own. Not only is it insanely fast, but demonstrates very competitive minification abilities, usually performing closely to Terser while supporting cutting-edge [ESNext syntax](https://esbuild.github.io/content-types/#javascript). However, note that esbuild has a [limited set of optimizations](https://github.com/evanw/esbuild/issues/639#:~:text=i%20can%20add%20a%20caveat%20to%20esbuild's%20minification%20documentation%20about%20code%20optimizations%20that%20are%20not%20included%20in%20esbuild.%20i%20think%20the%20list%20of%20possible%20code%20optimizations%20that%20esbuild%20doesn't%20do%20would%20be%20something%20like%20this%3A) and currently has [no plans to improve it](https://github.com/evanw/esbuild/issues/639#issuecomment-792033958).

_⚡️ Pro Tip: Harness the speed of esbuild in your Webpack build for minification (and even transpilation) with [esbuild-loader](https://github.com/privatenumber/esbuild-loader)._

Definitely keep an eye out for [swc](https://github.com/swc-project/swc), the JS compiler written in Rust. It's also blazing fast and rumor has it they're stepping up their minification.
