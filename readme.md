# Minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

## Results

### d3/dist/d3
- **File** `node_modules/d3/dist/d3.js`
- **Size** `503.62 KB`
- **Gzip size** `118.51 KB`

| Minifier                |                   Size |             Gzip size |           Time |
| :---------------------- | ---------------------: | --------------------: | -------------: |
| babel-minify - default  | 🐥 `240.19 KB` (`47%`) |    `80.38 KB` (`67%`) | 🐢 `6514.97ms` |
| esbuild                 |    `245.33 KB` (`48%`) | 🐷 `82.28 KB` (`69%`) |     `771.10ms` |
| terser - default        |    `242.96 KB` (`48%`) |    `79.76 KB` (`67%`) |    `2048.52ms` |
| terser - no compress    |  🐷 `249.9 KB` (`49%`) |    `80.89 KB` (`68%`) |     `852.06ms` |
| uglify-js - default     |    `241.46 KB` (`47%`) |  🐥 `79.2 KB` (`66%`) |    `3462.10ms` |
| uglify-js - no compress |    `249.56 KB` (`49%`) |    `80.29 KB` (`67%`) |  🐇 `538.92ms` |

### jquery
- **File** `node_modules/jquery/dist/jquery.js`
- **Size** `280.89 KB`
- **Gzip size** `82.74 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `90.23 KB` (`32%`) |    `31.19 KB` (`37%`) | 🐢 `2431.55ms` |
| esbuild                 |    `88.52 KB` (`31%`) | 🐷 `31.42 KB` (`37%`) |   🐇 `27.15ms` |
| terser - default        |    `88.23 KB` (`31%`) |    `30.49 KB` (`36%`) |     `786.62ms` |
| terser - no compress    | 🐷 `92.79 KB` (`33%`) |    `31.15 KB` (`37%`) |     `278.34ms` |
| uglify-js - default     | 🐥 `87.05 KB` (`30%`) | 🐥 `30.29 KB` (`36%`) |    `1139.08ms` |
| uglify-js - no compress |    `92.05 KB` (`32%`) |    `30.84 KB` (`37%`) |     `185.25ms` |

### lodash
- **File** `node_modules/lodash/lodash.js`
- **Size** `529.85 KB`
- **Gzip size** `94.54 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `70.25 KB` (`13%`) |    `24.66 KB` (`26%`) | 🐢 `1805.35ms` |
| esbuild                 |    `70.26 KB` (`13%`) | 🐷 `25.74 KB` (`27%`) |   🐇 `30.96ms` |
| terser - default        |    `69.54 KB` (`13%`) |    `24.64 KB` (`26%`) |     `659.94ms` |
| terser - no compress    | 🐷 `74.01 KB` (`13%`) |    `25.64 KB` (`27%`) |     `279.18ms` |
| uglify-js - default     | 🐥 `68.32 KB` (`12%`) | 🐥 `24.06 KB` (`25%`) |     `975.14ms` |
| uglify-js - no compress |    `73.46 KB` (`13%`) |     `25.2 KB` (`26%`) |     `216.50ms` |

### moment
- **File** `node_modules/moment/moment.js`
- **Size** `169.75 KB`
- **Gzip size** `35.7 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `57.83 KB` (`34%`) |    `18.33 KB` (`51%`) | 🐢 `1168.86ms` |
| esbuild                 |    `58.71 KB` (`34%`) |    `18.96 KB` (`53%`) |   🐇 `20.16ms` |
| terser - default        |    `57.81 KB` (`34%`) |    `18.26 KB` (`51%`) |     `421.48ms` |
| terser - no compress    | 🐷 `61.79 KB` (`36%`) | 🐷 `19.25 KB` (`53%`) |     `154.39ms` |
| uglify-js - default     |  🐥 `57.4 KB` (`33%`) | 🐥 `18.16 KB` (`50%`) |     `576.75ms` |
| uglify-js - no compress |    `61.51 KB` (`36%`) |     `19.1 KB` (`53%`) |     `114.13ms` |

### react/cjs/react.development.js
- **File** `node_modules/react/cjs/react.development.js`
- **Size** `59.22 KB`
- **Gzip size** `16.1 KB`

| Minifier                |                  Size |            Gzip size |          Time |
| :---------------------- | --------------------: | -------------------: | ------------: |
| babel-minify - default  |     `19.4 KB` (`32%`) |    `7.03 KB` (`43%`) |    `244.30ms` |
| esbuild                 |    `19.65 KB` (`33%`) |    `7.18 KB` (`44%`) |  🐇 `11.17ms` |
| terser - default        |    `19.11 KB` (`32%`) |    `6.99 KB` (`43%`) |    `154.85ms` |
| terser - no compress    | 🐷 `20.71 KB` (`34%`) | 🐷 `7.34 KB` (`45%`) |     `47.76ms` |
| uglify-js - default     |  🐥 `18.7 KB` (`31%`) | 🐥 `6.83 KB` (`42%`) | 🐢 `300.33ms` |
| uglify-js - no compress |    `20.46 KB` (`34%`) |    `7.15 KB` (`44%`) |     `51.35ms` |

### terser
- **File** `node_modules/terser/dist/bundle.min.js`
- **Size** `787.18 KB`
- **Gzip size** `157.4 KB`

| Minifier                |                   Size |              Gzip size |           Time |
| :---------------------- | ---------------------: | ---------------------: | -------------: |
| babel-minify - default  |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| esbuild                 |    `360.71 KB` (`45%`) | 🐷 `104.68 KB` (`66%`) |   🐇 `56.00ms` |
| terser - default        | 🐥 `358.73 KB` (`45%`) | 🐥 `101.89 KB` (`64%`) | 🐢 `1753.08ms` |
| terser - no compress    | 🐷 `371.76 KB` (`47%`) |    `102.58 KB` (`65%`) |     `666.44ms` |
| uglify-js - default     |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| uglify-js - no compress |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |

### vue/dist/vue.runtime.common.dev
- **File** `node_modules/vue/dist/vue.runtime.common.dev.js`
- **Size** `217.93 KB`
- **Gzip size** `60.81 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `93.04 KB` (`42%`) |    `30.78 KB` (`50%`) | 🐢 `1299.31ms` |
| esbuild                 |    `93.14 KB` (`42%`) |    `31.12 KB` (`51%`) |   🐇 `26.77ms` |
| terser - default        |    `92.77 KB` (`42%`) |     `30.6 KB` (`50%`) |     `407.80ms` |
| terser - no compress    | 🐷 `98.89 KB` (`45%`) |     `31.4 KB` (`51%`) |     `183.06ms` |
| uglify-js - default     | 🐥 `92.23 KB` (`42%`) | 🐥 `30.59 KB` (`50%`) |     `861.72ms` |
| uglify-js - no compress |    `98.68 KB` (`45%`) |  🐷 `31.4 KB` (`51%`) |     `193.82ms` |

