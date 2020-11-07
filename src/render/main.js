/*
 * @Author: your name
 * @Date: 2020-08-21 21:03:28
 * @LastEditTime: 2020-11-07 13:52:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import router from './router/index';
import {store} from './store/index'

/** 滑动条 */
import "./css/SpecificImpact/scrollbar.css"
import "./css/GlobalImpact/global.scss"

// import "../../keyevent/pkg/keyevent_bg.wasm"
// 不能写相对路径
import "keyevent/keyevent_bg.wasm"
// import "keyevent"

import init,{hidesibebar} from "keyevent/keyevent.js"



// import init,{hidesibebar} from "keyevent/keyevent.js"
// import init from "keyevent"
// fetch('http://localhost:3344/@modules/keyevent/keyevent_bg.wasm').then(response =>
//   response.arrayBuffer()
// )
    async function run() {
        await init()
    }
    run()




/** Prism */
import "prismjs/themes/prism.css"
import "prismjs/themes/prism-solarizedlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"



/** Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";



const app = createApp(App)
app.use(router)
app.use(store)


app.mount('#app')
