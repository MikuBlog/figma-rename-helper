/*
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-11 18:08:49
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-16 10:57:58
 * @FilePath: /figma-plugin-vue3-template/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'

import { createPinia } from 'pinia'

import 'virtual:uno.css'

import '@/styles/global.less'

import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
