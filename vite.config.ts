/*
 * @Author: your name
 * @Date: 2020-08-21 21:03:28
 * @LastEditTime: 2021-02-13 14:31:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\vite.config.ts
 */
/**
 * 参考链接: https://github.com/vitejs/vite/blob/master/src/node/config.ts
 */
import { join } from 'path'
import { defineConfig,Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '.env') })

 function electron_commonjs():Plugin {
    const nodeAPI = /(fs|path)/
    const ext = /\.(ts|vue)$/
    return {
        name:'electron_commonjs',
        resolveId(id){
            if (nodeAPI.test(id)) {
                console.log(id)
                return `const fs = require("fs")`
            }
        },
        transform(raw,id){// id 为 文件名 raw 为文件内容
          if (ext.test(id)) {
            return {
              code:raw.replace(/import \{ [a-zA-Z,]+ \} from "fs"/, replacer),
              map:null
            } 
          }
        }
    }
}
function replacer(match:string,p1:any,p2:any,offset:any,string:any){
  match = match.replace(/f.+$/," = require(\"fs\")")
  match = match.replace(/.+t/,"const ")
  return match
}



// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src/render'),
  server:{
    port: +process.env.PORT,
  },
  build: {
    assetsDir: ".",
    outDir: "dist",
  },
  optimizeDeps:{
    exclude:['keyevent',"Stats","Dirent","fs",'path','electron-window-state']
  },
  plugins: [vue()]
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
