# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

The following JavaScript minifiers are benchmarked to compare quality and speed:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

Benchmarks updated on <!-- lastUpdated:start -->Aug 30, 2021<!-- lastUpdated:end -->.

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 👟 Methodology

- Each minifier is executed in its own process with a 1 minute timeout
- _"Time"_ is the average of 5 consecutive runs
- _"Minzipped size"_ (minified & gzipped) measures how well the minified file compresses with Gzip
- Results are sorted by smallest minzipped size
- Each _"Time"_ is annotated with a multiplier relative to the fastest minifier
- Minified artifacts are validated by a smoke test
- Minified artifacts can be downloaded and verified in each [action run](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml)

## 📋 Results

<!-- benchmarks:start -->
| Artifact                                                      | Original size |  Gzip size |
| :------------------------------------------------------------ | ------------: | ---------: |
| [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1) |    `72.13 kB` | `19.45 kB` |

| Minifier                             |                    Minified size |                  Minzipped size |                      Time |
| :----------------------------------- | -------------------------------: | ------------------------------: | ------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-67% </sup>`23.74 kB`** | **<sup>🏆-56% </sup>`8.56 kB`** | **<sup>🏆 </sup>`22 ms`** |
----
| Artifact                                                        | Original size |  Gzip size |
| :-------------------------------------------------------------- | ------------: | ---------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) |   `173.90 kB` | `36.53 kB` |

| Minifier                             |                    Minified size |                   Minzipped size |                      Time |
| :----------------------------------- | -------------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-66% </sup>`59.89 kB`** | **<sup>🏆-47% </sup>`19.30 kB`** | **<sup>🏆 </sup>`34 ms`** |
----
| Artifact                                                  | Original size |  Gzip size |
| :-------------------------------------------------------- | ------------: | ---------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) |   `223.16 kB` | `62.26 kB` |

| Minifier                             |                    Minified size |                   Minzipped size |                      Time |
| :----------------------------------- | -------------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-57% </sup>`95.07 kB`** | **<sup>🏆-49% </sup>`31.76 kB`** | **<sup>🏆 </sup>`33 ms`** |
----
| Artifact                                                      | Original size |  Gzip size |
| :------------------------------------------------------------ | ------------: | ---------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) |   `287.63 kB` | `84.73 kB` |

| Minifier                             |                    Minified size |                   Minzipped size |                      Time |
| :----------------------------------- | -------------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-69% </sup>`90.23 kB`** | **<sup>🏆-62% </sup>`32.00 kB`** | **<sup>🏆 </sup>`42 ms`** |
----
| Artifact                                                          | Original size |  Gzip size |
| :---------------------------------------------------------------- | ------------: | ---------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) |   `544.09 kB` | `97.26 kB` |

| Minifier                             |                    Minified size |                   Minzipped size |                      Time |
| :----------------------------------- | -------------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-87% </sup>`72.50 kB`** | **<sup>🏆-73% </sup>`26.14 kB`** | **<sup>🏆 </sup>`43 ms`** |
----
| Artifact                                              | Original size |   Gzip size |
| :---------------------------------------------------- | ------------: | ----------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) |   `555.77 kB` | `130.55 kB` |

| Minifier                             |                     Minified size |                   Minzipped size |                      Time |
| :----------------------------------- | --------------------------------: | -------------------------------: | ------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-51% </sup>`270.19 kB`** | **<sup>🏆-31% </sup>`90.63 kB`** | **<sup>🏆 </sup>`84 ms`** |
----
| Artifact                                                      | Original size |   Gzip size |
| :------------------------------------------------------------ | ------------: | ----------: |
| [terser v5.7.2](https://www.npmjs.com/package/terser/v/5.7.2) |   `885.91 kB` | `177.57 kB` |

| Minifier                             |                     Minified size |                    Minzipped size |                      Time |
| :----------------------------------- | --------------------------------: | --------------------------------: | ------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-53% </sup>`412.27 kB`** | **<sup>🏆-33% </sup>`118.28 kB`** | **<sup>🏆 </sup>`68 ms`** |
----
| Artifact                                                        | Original size |   Gzip size |
| :-------------------------------------------------------------- | ------------: | ----------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) |     `1.25 MB` | `249.01 kB` |

| Minifier                             |                     Minified size |                    Minzipped size |                       Time |
| :----------------------------------- | --------------------------------: | --------------------------------: | -------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-48% </sup>`646.98 kB`** | **<sup>🏆-34% </sup>`163.24 kB`** | **<sup>🏆 </sup>`124 ms`** |
----
| Artifact                                                          | Original size |   Gzip size |
| :---------------------------------------------------------------- | ------------: | ----------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) |     `2.13 MB` | `312.10 kB` |

| Minifier                             |                     Minified size |                    Minzipped size |                       Time |
| :----------------------------------- | --------------------------------: | --------------------------------: | -------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-66% </sup>`724.31 kB`** | **<sup>🏆-42% </sup>`180.46 kB`** | **<sup>🏆 </sup>`156 ms`** |
----
| Artifact                                                        | Original size |   Gzip size |
| :-------------------------------------------------------------- | ------------: | ----------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) |     `3.20 MB` | `689.65 kB` |

| Minifier                             |                   Minified size |                    Minzipped size |                       Time |
| :----------------------------------- | ------------------------------: | --------------------------------: | -------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-68% </sup>`1.01 MB`** | **<sup>🏆-52% </sup>`331.66 kB`** | **<sup>🏆 </sup>`238 ms`** |
----
| Artifact                                                    | Original size |   Gzip size |
| :---------------------------------------------------------- | ------------: | ----------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) |     `6.67 MB` | `833.31 kB` |

| Minifier                             |                   Minified size |                    Minzipped size |                       Time |
| :----------------------------------- | ------------------------------: | --------------------------------: | -------------------------: |
| [esbuild](/lib/minifiers/esbuild.ts) | **<sup>🏆-65% </sup>`2.31 MB`** | **<sup>🏆-41% </sup>`491.15 kB`** | **<sup>🏆 </sup>`417 ms`** |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome! See the [contribution guide](/.github/CONTRIBUTING.md) for more info.

## 🥇 Results

### Best minification performance
[UglifyJS](https://github.com/mishoo/UglifyJS) takes first place for the smallest uncompressed minified size for all races, and wins 9 out of 11 races for minzipped size! Impressively, it's still written in ES5 but can handle ES6 up to ES2020.

[Terser](https://github.com/terser/terser) takes a very close second, only short by at most by 1% in minzipped size while performing twice as fast as Uglify! Terser is a fork of UglifyJS and comes with support for ES6+.

### Fastest minifier
[esbuild](https://github.com/evanw/esbuild) runs _10x_+ laps around everyone else! The Go-lang JS minifier/bundler is a beast of its own. Not only is it insanely fast, but demonstrates very competitive minification abilities, usually performing closely to Terser while supporting cutting-edge [ESNext syntax](https://esbuild.github.io/content-types/#javascript). However, note that esbuild has a [limited set of optimizations](https://github.com/evanw/esbuild/issues/639#:~:text=i%20can%20add%20a%20caveat%20to%20esbuild's%20minification%20documentation%20about%20code%20optimizations%20that%20are%20not%20included%20in%20esbuild.%20i%20think%20the%20list%20of%20possible%20code%20optimizations%20that%20esbuild%20doesn't%20do%20would%20be%20something%20like%20this%3A) and there are currently [no plans to improve it](https://github.com/evanw/esbuild/issues/639#issuecomment-792033958).

_⚡️ Pro Tip: Harness the speed of esbuild in your Webpack build for minification (and even transpilation) with [esbuild-loader](https://github.com/privatenumber/esbuild-loader)._

Definitely keep an eye out for [swc](https://github.com/swc-project/swc), the JS compiler written in Rust. It's also blazing fast and rumor has it they're stepping up their minification.
