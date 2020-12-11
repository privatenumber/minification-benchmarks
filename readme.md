# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

## 📋 Results
- The measured time an average taken from 10 consecutive runs
- Each table is sorted by smallest minified size
- Minzipped size measures how well the minified file compresses with Gzip

----

<!-- benchmarks:start -->
### [lodash v4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- Size: `542.6 kB`
- Gzip size: `96.8 kB`

| Minifier                                                                   |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -88% </sup>`69.5 kB` | <sup>🏆 -75% </sup>`24.5 kB` |            `1,688.99ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-87% </sup>`71.2 kB` |    <sup>-74% </sup>`25.2 kB` |            `1,042.51ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-87% </sup>`71.9 kB` |    <sup>-74% </sup>`25.3 kB` |            `2,390.09ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-87% </sup>`72.7 kB` |    <sup>-73% </sup>`26.2 kB` | <sup>🏆 </sup>`35.56ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-87% </sup>`75.2 kB` |    <sup>-74% </sup>`25.8 kB` |              `360.53ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-87% </sup>`75.8 kB` |    <sup>-73% </sup>`26.3 kB` |              `436.64ms` |
----
### [three v0.123.0](https://www.npmjs.com/package/three/v/0.123.0)
- Size: `1.2 MB`
- Gzip size: `248.7 kB`

| Minifier                                                                   |                      Minified |                     Minzipped |                    Time |
| :------------------------------------------------------------------------- | ----------------------------: | ----------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -49% </sup>`643.9 kB` | <sup>🏆 -37% </sup>`158.9 kB` |            `6,400.36ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-49% </sup>`644.6 kB` |    <sup>-36% </sup>`161.3 kB` |           `11,602.13ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-49% </sup>`647.0 kB` |    <sup>-35% </sup>`163.2 kB` | <sup>🏆 </sup>`97.86ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-48% </sup>`652.7 kB` |    <sup>-37% </sup>`159.0 kB` |             `3,721.5ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-46% </sup>`674.6 kB` |    <sup>-35% </sup>`162.7 kB` |            `1,178.56ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-46% </sup>`674.8 kB` |    <sup>-35% </sup>`162.7 kB` |            `1,636.46ms` |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Size: `223.2 kB`
- Gzip size: `62.3 kB`

| Minifier                                                                   |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -58% </sup>`94.2 kB` | <sup>🏆 -50% </sup>`31.2 kB` |            `1,241.86ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-58% </sup>`95.0 kB` |    <sup>-50% </sup>`31.3 kB` |              `736.93ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-58% </sup>`95.3 kB` |    <sup>-50% </sup>`31.5 kB` |            `1,843.87ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-58% </sup>`95.4 kB` |    <sup>-49% </sup>`31.9 kB` | <sup>🏆 </sup>`29.24ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |   <sup>-55% </sup>`101.0 kB` |    <sup>-49% </sup>`32.2 kB` |              `286.95ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |   <sup>-55% </sup>`101.3 kB` |    <sup>-49% </sup>`32.2 kB` |              `331.88ms` |
----
### [react v16.13.1](https://www.npmjs.com/package/react/v/16.13.1)
- Size: `60.6 kB`
- Gzip size: `16.5 kB`

| Minifier                                                                   |                     Minified |                   Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | --------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -69% </sup>`19.1 kB` | <sup>🏆 -58% </sup>`6.9 kB` |              `499.12ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-68% </sup>`19.6 kB` |    <sup>-57% </sup>`7.1 kB` |              `272.78ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-68% </sup>`19.9 kB` |    <sup>-57% </sup>`7.2 kB` |              `655.79ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-67% </sup>`20.1 kB` |    <sup>-56% </sup>`7.3 kB` | <sup>🏆 </sup>`11.71ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-66% </sup>`21.0 kB` |    <sup>-56% </sup>`7.3 kB` |               `97.35ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-66% </sup>`21.2 kB` |    <sup>-55% </sup>`7.5 kB` |              `125.17ms` |
----
### [moment v2.28.0](https://www.npmjs.com/package/moment/v/2.28.0)
- Size: `173.9 kB`
- Gzip size: `36.5 kB`

| Minifier                                                                   |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -67% </sup>`58.4 kB` | <sup>🏆 -50% </sup>`18.5 kB` |            `1,504.86ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-66% </sup>`59.2 kB` |    <sup>-49% </sup>`18.7 kB` |              `755.33ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-66% </sup>`59.3 kB` |    <sup>-49% </sup>`18.8 kB` |            `1,692.34ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-66% </sup>`60.2 kB` |    <sup>-47% </sup>`19.4 kB` | <sup>🏆 </sup>`20.61ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-64% </sup>`63.0 kB` |    <sup>-47% </sup>`19.6 kB` |              `323.76ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-64% </sup>`63.3 kB` |    <sup>-47% </sup>`19.7 kB` |              `338.38ms` |
----
### [d3 v5.16.0](https://www.npmjs.com/package/d3/v/5.16.0)
- Size: `515.7 kB`
- Gzip size: `121.4 kB`

| Minifier                                                                   |                      Minified |                    Minzipped |                 Time |
| :------------------------------------------------------------------------- | ----------------------------: | ---------------------------: | -------------------: |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   | <sup>🏆 -53% </sup>`246.0 kB` |    <sup>-33% </sup>`82.3 kB` |         `7,919.42ms` |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         |    <sup>-53% </sup>`246.6 kB` | <sup>🏆 -34% </sup>`80.8 kB` |         `4,966.42ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-52% </sup>`248.8 kB` |    <sup>-33% </sup>`81.7 kB` |         `2,306.13ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-52% </sup>`251.2 kB` |    <sup>-31% </sup>`84.2 kB` | <sup>🏆 </sup>`61ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-51% </sup>`255.5 kB` |    <sup>-33% </sup>`82.2 kB` |           `803.77ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-51% </sup>`255.9 kB` |    <sup>-32% </sup>`82.8 kB` |          `1,112.3ms` |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Size: `287.6 kB`
- Gzip size: `84.7 kB`

| Minifier                                                                   |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -70% </sup>`88.9 kB` | <sup>🏆 -64% </sup>`31.0 kB` |            `1,843.07ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |    <sup>-69% </sup>`90.3 kB` |    <sup>-64% </sup>`31.2 kB` |            `1,117.14ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |    <sup>-69% </sup>`90.6 kB` |    <sup>-63% </sup>`32.2 kB` | <sup>🏆 </sup>`30.51ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |    <sup>-68% </sup>`92.4 kB` |    <sup>-63% </sup>`31.9 kB` |            `3,052.02ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-68% </sup>`94.3 kB` |    <sup>-63% </sup>`31.6 kB` |              `351.48ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |    <sup>-67% </sup>`95.0 kB` |    <sup>-63% </sup>`31.9 kB` |              `478.65ms` |
----
### [terser v5.5.1](https://www.npmjs.com/package/terser/v/5.5.1)
- Size: `632 B`
- Gzip size: `298 B`

| Minifier                                                                                       |                   Minified |                  Minzipped |                   Time |
| :--------------------------------------------------------------------------------------------- | -------------------------: | -------------------------: | ---------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                 | <sup>🏆 -41% </sup>`374 B` | <sup>🏆 -22% </sup>`235 B` | <sup>🏆 </sup>`7.83ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                                                   |    <sup>-35% </sup>`411 B` |    <sup>-21% </sup>`238 B` |              `28.03ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                           |    <sup>-35% </sup>`411 B` |    <sup>-22% </sup>`235 B` |              `16.27ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js) <sub>_Failed_</sub>                   |                          — |                          — |                      — |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js) <sub>_Failed_</sub>                         |                          — |                          — |                      — |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) <sub>_Failed_</sub> |                          — |                          — |                      — |
<!-- benchmarks:end -->

