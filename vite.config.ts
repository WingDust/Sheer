/**
 * 参考链接: https://github.com/vitejs/vite/blob/master/src/node/config.ts
 */
import { join,resolve } from 'path'
import { defineConfig,Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '.env') })

function electron_commonjs():Plugin {
    const nodeAPI = /(fs|path)/
    const ext = /\.(ts|vue)$/
    return {
      name:"electron_commonjs",
        resolveId(id){
            if (nodeAPI.test(id)) {
                console.log(id)
                return `const fs = require("fs")`
            }
        },
        transform(source,id){// id 为 文件名 source 为文件内容
          if (ext.test(id)) {
            return {
              code:replacer(source)
            }
          }
        }
    }
}

export function replacer(source:string) {
  source=source.replace(/import \{ipcRenderer\} from \".+\"/,"const {ipcRenderer} = require(\"electron\")")
  source=source.replace(/import \{remote\} from \".+\"/,"const {remote} = require(\"electron\")")
  source=source.replace(/import path from \".+\"/,"const path = require(\"path\")")
  source=source.replace(/import fs from \".+\"/,"const fs = require(\"fs\")")
  source=source.replace(/import child_process from \".+\"/,"const child_process = require(\"child_process\")")
  source=source.replace(/import child_process from \".+\"/,"const child_process = require(\"child_process\")")
  // source=source.replace(/import devtools from \"/,"const devtools = require(")
  return source
}



// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{'/@/':resolve(__dirname,'./src')},
  },
  root: join(__dirname, 'src/render'),
  base:'./',
  server:{
    port: +process.env.PORT!,
    // hmr: { overlay: false },
  },
  build: {
    assetsDir: ".",
    outDir: "dist",
  },
  optimizeDeps:{
    exclude:[
      'keyevent',"Stats","Dirent","fs",'path','electron-window-state','electron',
      'vuex','vue-router','vue','vue3-lazyload','prismjs'
    ]
  },
  plugins: [vue(),electron_commonjs()]
})
// const config: UserConfig = {
//   root: join(__dirname, 'src/render'),
//   port: +process.env.PORT,
//   base: './',
//   optimizeDeps:{
//     exclude:['keyevent','fs']
//   }
// }

// export default config
