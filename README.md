<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-11 18:08:49
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-06-08 10:19:40
 * @FilePath: /figma-plugin-vue3-template/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Figma-Rename-Helper

![introduction](https://s3.bmp.ovh/imgs/2024/06/08/b4d8317fbaa319dd.png)

## Technology-Stack

- [x] vue3
- [x] pinia
- [x] element-plus
- [x] unocss
- [x] vite
- [x] typescript
- [x] eslint
- [x] change-log
- [x] unplugin-auto-import
- [x] unplugin-vue-components
- [x] unplugin-element-plus

## Dev (watch)

```bash
npm run start:dev
```

## About-Figma-Plugin 

All it Need (main + ui):

> manifest.json

```json
  "main": "dist/code.js",
  "ui": "dist/index.html",
```

- **main**: to use figma plugin API.
- **ui**  : single html file touch the main

**main <=`postMessage/onmessage`=> ui**