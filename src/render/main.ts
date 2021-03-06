const devtools = require("@vue/devtools") ;
// import devtools from "@vue/devtools";
if(process.env.NODE_ENV === 'development'){
    devtools.connect('localhost',8098)
}

import VueLazyLoad from "vue3-lazyload";

import { createApp } from 'vue'
import App from './App.vue'
// 全局组件
import singlevil from "./components/vim/SingleEvil.vue";


import './index.css'

import router from './router/index';
import {store} from './store/index'

/** 滑动条 */
import "./css/SpecificImpact/scrollbar.css"
import "./css/GlobalImpact/global.scss"

// import "../../keyevent/pkg/keyevent_bg.wasm"
// 不能写相对路径
// import "keyevent/keyevent_bg.wasm"
// import "keyevent"

// import init,{hidesibebar} from "keyevent/keyevent.js"



// import init,{hidesibebar} from "keyevent/keyevent.js"
// import init from "keyevent"
// fetch('http://localhost:3344/@modules/keyevent/keyevent_bg.wasm').then(response =>
//   response.arrayBuffer()
// )
    // async function run() {
    //     await init()
    // }
    // run()

// import add from './Webassemly/wast/add.wasm'

// const im = {console:{log:(arg)=>{console.log(arg)}}}
// [WebAssembly.instantiateStreaming](https://github.com/vitejs/vite/blob/2286f629ab6d96fb0b90c9825582962bf8f0f2a5/packages/vite/src/node/plugins/wasm.ts#L20)
// WebAssembly.instantiateStreaming(fetch('http://localhost:3344/Webassembly/wast/add.wasm?import'),im)
// .then(i =>  console.log(i.exports.add(6,0,0)))
// async function wasm(init: typeof import("./Webassemly/wast/add.wasm")){
    // const {add} = await init(im)
    // const {add} = await init()
    // console.log(add(6n,4n,2n)); 
    // console.log(add(6,4,2)); 
// }
// wasm(add)




/** Prism */
import "prismjs/themes/prism.css"
import "prismjs/themes/prism-solarizedlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"



/** Bootstrap */
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";


/** [解决Electron Security Warning (Node.js Integration with Remote Content) This renderer process has Nod](https://blog.csdn.net/eyulove/article/details/104955782)  */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueLazyLoad,{})

// 全局注册组件
app.component('singlevil',singlevil)

app.mount('#app')
