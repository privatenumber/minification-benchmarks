# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

## 📋 Results
- Each minifier is executed in its own process
- The measured time is an average taken from 10 consecutive runs
- Each table is sorted by smallest minified size
- Minzipped size measures how well the minified file compresses with Gzip
- Comments are not stripped because not all minifiers support this

----

<!-- benchmarks:start -->
### [d3 v5.16.0](https://www.npmjs.com/package/d3/v/5.16.0)
- Size: `515.7 kB`
- Gzip size: `121.4 kB`

| Minifier                                                                   |                      Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ----------------------------: | ---------------------------: | ----------------------: |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   | <sup>🏆 -53% </sup>`246.0 kB` |    <sup>-33% </sup>`82.3 kB` |            `8,470.73ms` |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         |    <sup>-53% </sup>`246.6 kB` | <sup>🏆 -34% </sup>`80.8 kB` |            `6,254.75ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-52% </sup>`248.8 kB` |    <sup>-33% </sup>`81.7 kB` |            `4,223.79ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-52% </sup>`251.2 kB` |    <sup>-31% </sup>`84.2 kB` | <sup>🏆 </sup>`92.71ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-51% </sup>`255.5 kB` |    <sup>-33% </sup>`82.2 kB` |              `951.61ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-51% </sup>`255.9 kB` |    <sup>-32% </sup>`82.8 kB` |            `2,109.97ms` |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Size: `287.6 kB`
- Gzip size: `84.7 kB`

| Minifier                                                                   |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -70% </sup>`88.9 kB` | <sup>🏆 -64% </sup>`31.0 kB` |            `2,544.63ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-69% </sup>`90.3 kB` |    <sup>-64% </sup>`31.2 kB` |            `1,840.82ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-69% </sup>`90.6 kB` |    <sup>-63% </sup>`32.2 kB` | <sup>🏆 </sup>`53.13ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-68% </sup>`92.4 kB` |    <sup>-63% </sup>`31.9 kB` |            `4,445.48ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-68% </sup>`94.3 kB` |    <sup>-63% </sup>`31.6 kB` |              `506.88ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-67% </sup>`95.0 kB` |    <sup>-63% </sup>`31.9 kB` |              `675.61ms` |
----
### [lodash v4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- Size: `542.6 kB`
- Gzip size: `96.8 kB`

| Minifier                                                                   |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -88% </sup>`69.5 kB` | <sup>🏆 -75% </sup>`24.5 kB` |            `4,782.25ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-87% </sup>`71.2 kB` |    <sup>-74% </sup>`25.2 kB` |             `1,783.7ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-87% </sup>`71.9 kB` |    <sup>-74% </sup>`25.3 kB` |            `2,769.06ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-87% </sup>`72.7 kB` |    <sup>-73% </sup>`26.2 kB` | <sup>🏆 </sup>`37.14ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-87% </sup>`75.2 kB` |    <sup>-74% </sup>`25.8 kB` |              `835.68ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-87% </sup>`75.8 kB` |    <sup>-73% </sup>`26.3 kB` |            `4,614.27ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Size: `173.9 kB`
- Gzip size: `36.5 kB`

| Minifier                                                                   |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -67% </sup>`58.3 kB` | <sup>🏆 -50% </sup>`18.5 kB` |            `2,998.92ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-66% </sup>`59.2 kB` |    <sup>-49% </sup>`18.7 kB` |             `1,488.4ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-66% </sup>`59.2 kB` |    <sup>-49% </sup>`18.8 kB` |            `2,956.88ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-66% </sup>`60.1 kB` |    <sup>-47% </sup>`19.4 kB` | <sup>🏆 </sup>`42.82ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-64% </sup>`63.0 kB` |    <sup>-47% </sup>`19.5 kB` |              `608.02ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-64% </sup>`63.3 kB` |    <sup>-47% </sup>`19.7 kB` |              `619.25ms` |
----
### [react v16.14.0](https://www.npmjs.com/package/react/v/16.14.0)
- Size: `60.6 kB`
- Gzip size: `16.5 kB`

| Minifier                                                                   |                     Minified |                   Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | --------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -69% </sup>`19.1 kB` | <sup>🏆 -58% </sup>`6.9 kB` |              `763.25ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-68% </sup>`19.6 kB` |    <sup>-57% </sup>`7.1 kB` |              `457.61ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-68% </sup>`19.9 kB` |    <sup>-57% </sup>`7.2 kB` |            `1,225.52ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-67% </sup>`20.1 kB` |    <sup>-56% </sup>`7.3 kB` | <sup>🏆 </sup>`22.48ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-66% </sup>`21.0 kB` |    <sup>-56% </sup>`7.3 kB` |              `138.18ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-66% </sup>`21.2 kB` |    <sup>-55% </sup>`7.5 kB` |              `196.26ms` |
----
### [terser v5.5.1](https://www.npmjs.com/package/terser/v/5.5.1)
- Size: `860.3 kB`
- Gzip size: `173.1 kB`

| Minifier                                                                                       |                      Minified |                     Minzipped |                    Time |
| :--------------------------------------------------------------------------------------------- | ----------------------------: | ----------------------------: | ----------------------: |
| [terser](/lib/benchmark/minifiers/terser.js)                                                   | <sup>🏆 -53% </sup>`407.2 kB` | <sup>🏆 -34% </sup>`114.6 kB` |            `3,542.56ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                 |    <sup>-53% </sup>`409.2 kB` |    <sup>-33% </sup>`117.5 kB` | <sup>🏆 </sup>`93.07ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                           |    <sup>-52% </sup>`420.8 kB` |    <sup>-34% </sup>`115.3 kB` |            `1,564.05ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js) <sub>_Failed_</sub>                   |                             — |                             — |                       — |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js) <sub>_Failed_</sub>                         |                             — |                             — |                       — |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) <sub>_Failed_</sub> |                             — |                             — |                       — |
----
### [three v0.123.0](https://www.npmjs.com/package/three/v/0.123.0)
- Size: `1.2 MB`
- Gzip size: `248.7 kB`

| Minifier                                                                   |                      Minified |                     Minzipped |                     Time |
| :------------------------------------------------------------------------- | ----------------------------: | ----------------------------: | -----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -49% </sup>`643.9 kB` | <sup>🏆 -37% </sup>`158.9 kB` |             `8,609.02ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-49% </sup>`644.6 kB` |    <sup>-36% </sup>`161.3 kB` |            `15,099.37ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-49% </sup>`647.0 kB` |    <sup>-35% </sup>`163.2 kB` | <sup>🏆 </sup>`138.66ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-48% </sup>`652.7 kB` |    <sup>-37% </sup>`159.0 kB` |             `4,778.23ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-46% </sup>`674.6 kB` |    <sup>-35% </sup>`162.7 kB` |             `1,604.78ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-46% </sup>`674.8 kB` |    <sup>-35% </sup>`162.7 kB` |              `2,049.4ms` |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Size: `223.2 kB`
- Gzip size: `62.3 kB`

| Minifier                                                                   |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -58% </sup>`94.2 kB` | <sup>🏆 -50% </sup>`31.2 kB` |            `1,974.65ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-58% </sup>`95.0 kB` |    <sup>-50% </sup>`31.3 kB` |              `994.28ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-58% </sup>`95.3 kB` |    <sup>-50% </sup>`31.5 kB` |            `2,462.91ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-58% </sup>`95.4 kB` |    <sup>-49% </sup>`31.9 kB` | <sup>🏆 </sup>`34.23ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |   <sup>-55% </sup>`101.0 kB` |    <sup>-49% </sup>`32.2 kB` |               `502.9ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |   <sup>-55% </sup>`101.3 kB` |    <sup>-49% </sup>`32.2 kB` |              `488.16ms` |
<!-- benchmarks:end -->

