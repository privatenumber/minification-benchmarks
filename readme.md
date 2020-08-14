# Minification benchmarks

- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

## Results

### d3/dist/d3
- **File** `node_modules/d3/dist/d3.js`
- **Size** `503.62 KB`
- **Gzip size** `118.51 KB`

| Minifier                |                   Size |            Gzip size |         Time |
| :---------------------- | ---------------------: | -------------------: | -----------: |
| babel-minify - default  | 🏆 `240.19 KB` (`47%`) |   `80.38 KB` (`67%`) |  `6017.93ms` |
| esbuild                 |    `245.73 KB` (`48%`) |   `82.45 KB` (`69%`) | 🏆 `94.43ms` |
| terser - default        |    `243.04 KB` (`48%`) |   `79.66 KB` (`67%`) |  `1890.54ms` |
| terser - no compress    |     `249.9 KB` (`49%`) |   `80.89 KB` (`68%`) |   `820.70ms` |
| uglify-js - default     |    `241.46 KB` (`47%`) | 🏆 `79.2 KB` (`66%`) |  `3303.83ms` |
| uglify-js - no compress |    `249.56 KB` (`49%`) |   `80.29 KB` (`67%`) |   `509.46ms` |

### lodash
- **File** `node_modules/lodash/lodash.js`
- **Size** `529.85 KB`
- **Gzip size** `94.54 KB`

| Minifier                |                  Size |             Gzip size |         Time |
| :---------------------- | --------------------: | --------------------: | -----------: |
| babel-minify - default  |    `70.25 KB` (`13%`) |    `24.66 KB` (`26%`) |  `1728.95ms` |
| esbuild                 |    `70.31 KB` (`13%`) |    `25.81 KB` (`27%`) | 🏆 `34.28ms` |
| terser - default        |     `71.6 KB` (`13%`) |    `24.47 KB` (`25%`) |   `760.88ms` |
| terser - no compress    |    `74.01 KB` (`13%`) |    `25.64 KB` (`27%`) |   `267.71ms` |
| uglify-js - default     | 🏆 `68.32 KB` (`12%`) | 🏆 `24.06 KB` (`25%`) |  `1082.74ms` |
| uglify-js - no compress |    `73.46 KB` (`13%`) |     `25.2 KB` (`26%`) |   `191.04ms` |

### moment
- **File** `node_modules/moment/moment.js`
- **Size** `169.75 KB`
- **Gzip size** `35.7 KB`

| Minifier                |                  Size |             Gzip size |         Time |
| :---------------------- | --------------------: | --------------------: | -----------: |
| babel-minify - default  |    `57.83 KB` (`34%`) |    `18.33 KB` (`51%`) |  `1129.54ms` |
| esbuild                 |    `58.78 KB` (`34%`) |    `19.05 KB` (`53%`) | 🏆 `19.08ms` |
| terser - default        |     `57.8 KB` (`34%`) |    `18.24 KB` (`51%`) |   `477.83ms` |
| terser - no compress    |    `61.79 KB` (`36%`) |    `19.25 KB` (`53%`) |   `151.76ms` |
| uglify-js - default     | 🏆 `57.41 KB` (`33%`) | 🏆 `18.16 KB` (`50%`) |   `644.11ms` |
| uglify-js - no compress |    `61.51 KB` (`36%`) |     `19.1 KB` (`53%`) |   `115.99ms` |

### react/cjs/react.development.js
- **File** `node_modules/react/cjs/react.development.js`
- **Size** `59.22 KB`
- **Gzip size** `16.1 KB`

| Minifier                |                 Size |            Gzip size |         Time |
| :---------------------- | -------------------: | -------------------: | -----------: |
| babel-minify - default  |    `19.4 KB` (`32%`) |    `7.03 KB` (`43%`) |   `233.70ms` |
| esbuild                 |   `19.72 KB` (`33%`) |    `7.21 KB` (`44%`) | 🏆 `11.35ms` |
| terser - default        |   `19.11 KB` (`32%`) |    `6.99 KB` (`43%`) |   `120.59ms` |
| terser - no compress    |   `20.71 KB` (`34%`) |    `7.34 KB` (`45%`) |    `62.90ms` |
| uglify-js - default     | 🏆 `18.7 KB` (`31%`) | 🏆 `6.83 KB` (`42%`) |   `200.37ms` |
| uglify-js - no compress |   `20.46 KB` (`34%`) |    `7.15 KB` (`44%`) |    `25.01ms` |

### terser
- **File** `node_modules/terser/dist/bundle.min.js`
- **Size** `778.21 KB`
- **Gzip size** `155.79 KB`

| Minifier                |                Size |           Gzip size |         Time |
| :---------------------- | ------------------: | ------------------: | -----------: |
| babel-minify - default  |           ⚠️ Failed |           ⚠️ Failed |    ⚠️ Failed |
| esbuild                 | `357.53 KB` (`45%`) | `104.22 KB` (`66%`) | 🏆 `60.40ms` |
| terser - default        |  `355.1 KB` (`45%`) | `101.15 KB` (`64%`) |  `1611.06ms` |
| terser - no compress    | `367.96 KB` (`47%`) | `101.82 KB` (`65%`) |   `620.84ms` |
| uglify-js - default     |           ⚠️ Failed |           ⚠️ Failed |    ⚠️ Failed |
| uglify-js - no compress |           ⚠️ Failed |           ⚠️ Failed |    ⚠️ Failed |

### vue/dist/vue.runtime.common.dev
- **File** `node_modules/vue/dist/vue.runtime.common.dev.js`
- **Size** `217.93 KB`
- **Gzip size** `60.81 KB`

| Minifier                |                  Size |             Gzip size |         Time |
| :---------------------- | --------------------: | --------------------: | -----------: |
| babel-minify - default  |    `93.04 KB` (`42%`) |    `30.77 KB` (`50%`) |  `1202.48ms` |
| esbuild                 |    `93.43 KB` (`42%`) |    `31.28 KB` (`51%`) | 🏆 `38.10ms` |
| terser - default        |    `92.77 KB` (`42%`) | 🏆 `30.59 KB` (`50%`) |   `505.32ms` |
| terser - no compress    |    `98.89 KB` (`45%`) |     `31.4 KB` (`51%`) |   `175.19ms` |
| uglify-js - default     | 🏆 `92.23 KB` (`42%`) |    `30.59 KB` (`50%`) |   `820.77ms` |
| uglify-js - no compress |    `98.68 KB` (`45%`) |     `31.4 KB` (`51%`) |   `139.85ms` |

