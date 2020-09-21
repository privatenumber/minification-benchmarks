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
| babel-minify - default  | 🐥 `240.19 KB` (`47%`) |    `80.38 KB` (`67%`) | 🐢 `6085.35ms` |
| esbuild                 |    `245.26 KB` (`48%`) | 🐷 `82.26 KB` (`69%`) |   🐇 `90.09ms` |
| terser - default        |    `242.96 KB` (`48%`) |    `79.76 KB` (`67%`) |    `2000.89ms` |
| terser - no compress    |  🐷 `249.9 KB` (`49%`) |    `80.89 KB` (`68%`) |     `822.62ms` |
| uglify-js - default     |    `241.43 KB` (`47%`) | 🐥 `79.21 KB` (`66%`) |    `3164.75ms` |
| uglify-js - no compress |    `249.56 KB` (`49%`) |    `80.29 KB` (`67%`) |     `546.85ms` |

### jquery
- **File** `node_modules/jquery/dist/jquery.js`
- **Size** `280.89 KB`
- **Gzip size** `82.74 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `90.23 KB` (`32%`) |    `31.19 KB` (`37%`) | 🐢 `1982.22ms` |
| esbuild                 |    `88.51 KB` (`31%`) | 🐷 `31.42 KB` (`37%`) |   🐇 `26.98ms` |
| terser - default        |    `88.23 KB` (`31%`) |    `30.49 KB` (`36%`) |     `672.87ms` |
| terser - no compress    | 🐷 `92.79 KB` (`33%`) |    `31.15 KB` (`37%`) |     `253.71ms` |
| uglify-js - default     | 🐥 `87.05 KB` (`30%`) | 🐥 `30.29 KB` (`36%`) |     `997.04ms` |
| uglify-js - no compress |    `92.05 KB` (`32%`) |    `30.84 KB` (`37%`) |     `185.19ms` |

### lodash
- **File** `node_modules/lodash/lodash.js`
- **Size** `529.85 KB`
- **Gzip size** `94.54 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `70.25 KB` (`13%`) |    `24.66 KB` (`26%`) | 🐢 `1511.54ms` |
| esbuild                 |    `70.22 KB` (`13%`) | 🐷 `25.73 KB` (`27%`) |   🐇 `28.61ms` |
| terser - default        |    `69.54 KB` (`13%`) |    `24.64 KB` (`26%`) |     `665.08ms` |
| terser - no compress    | 🐷 `74.01 KB` (`13%`) |    `25.64 KB` (`27%`) |     `272.37ms` |
| uglify-js - default     | 🐥 `68.31 KB` (`12%`) | 🐥 `24.05 KB` (`25%`) |     `952.09ms` |
| uglify-js - no compress |    `73.46 KB` (`13%`) |     `25.2 KB` (`26%`) |     `180.04ms` |

### moment
- **File** `node_modules/moment/moment.js`
- **Size** `169.78 KB`
- **Gzip size** `35.69 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `57.87 KB` (`34%`) |    `18.34 KB` (`51%`) | 🐢 `1053.66ms` |
| esbuild                 |    `58.74 KB` (`34%`) |    `18.96 KB` (`53%`) |   🐇 `18.22ms` |
| terser - default        |    `57.84 KB` (`34%`) |    `18.27 KB` (`51%`) |     `429.16ms` |
| terser - no compress    | 🐷 `61.82 KB` (`36%`) | 🐷 `19.26 KB` (`53%`) |     `148.60ms` |
| uglify-js - default     | 🐥 `57.43 KB` (`33%`) | 🐥 `18.16 KB` (`50%`) |     `562.93ms` |
| uglify-js - no compress |    `61.54 KB` (`36%`) |     `19.1 KB` (`53%`) |     `109.82ms` |

### react/cjs/react.development.js
- **File** `node_modules/react/cjs/react.development.js`
- **Size** `59.22 KB`
- **Gzip size** `16.1 KB`

| Minifier                |                  Size |            Gzip size |          Time |
| :---------------------- | --------------------: | -------------------: | ------------: |
| babel-minify - default  |     `19.4 KB` (`32%`) |    `7.03 KB` (`43%`) | 🐢 `252.43ms` |
| esbuild                 |    `19.65 KB` (`33%`) |    `7.18 KB` (`44%`) |  🐇 `10.73ms` |
| terser - default        |    `19.12 KB` (`32%`) |    `6.97 KB` (`43%`) |    `140.19ms` |
| terser - no compress    | 🐷 `20.71 KB` (`34%`) | 🐷 `7.34 KB` (`45%`) |     `44.38ms` |
| uglify-js - default     |  🐥 `18.7 KB` (`31%`) | 🐥 `6.83 KB` (`42%`) |    `188.36ms` |
| uglify-js - no compress |    `20.46 KB` (`34%`) |    `7.15 KB` (`44%`) |     `28.62ms` |

### terser
- **File** `node_modules/terser/dist/bundle.min.js`
- **Size** `835.03 KB`
- **Gzip size** `167.85 KB`

| Minifier                |                   Size |              Gzip size |           Time |
| :---------------------- | ---------------------: | ---------------------: | -------------: |
| babel-minify - default  |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| esbuild                 |    `398.14 KB` (`47%`) | 🐷 `114.27 KB` (`68%`) |   🐇 `57.59ms` |
| terser - default        | 🐥 `396.16 KB` (`47%`) | 🐥 `111.45 KB` (`66%`) | 🐢 `1650.03ms` |
| terser - no compress    | 🐷 `409.27 KB` (`49%`) |    `112.18 KB` (`66%`) |     `676.80ms` |
| uglify-js - default     |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| uglify-js - no compress |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |

### vue/dist/vue.runtime.common.dev
- **File** `node_modules/vue/dist/vue.runtime.common.dev.js`
- **Size** `217.93 KB`
- **Gzip size** `60.81 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `93.04 KB` (`42%`) |    `30.78 KB` (`50%`) | 🐢 `1187.67ms` |
| esbuild                 |    `93.13 KB` (`42%`) |    `31.11 KB` (`51%`) |   🐇 `24.62ms` |
| terser - default        |    `92.77 KB` (`42%`) |     `30.6 KB` (`50%`) |     `429.44ms` |
| terser - no compress    | 🐷 `98.89 KB` (`45%`) |     `31.4 KB` (`51%`) |     `236.71ms` |
| uglify-js - default     |  🐥 `92.2 KB` (`42%`) | 🐥 `30.58 KB` (`50%`) |     `771.42ms` |
| uglify-js - no compress |    `98.68 KB` (`45%`) |  🐷 `31.4 KB` (`51%`) |     `151.08ms` |

