/*
 * @Author: your name
 * @Date: 2020-08-21 21:03:28
 * @LastEditTime: 2021-02-01 20:26:03
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
    return {
        name:'electron_commonjs',
        resolveId(id){
            if (nodeAPI.test(id)) {
                console.log(id)
                return `const fs = require("fs")`
            }
        },
        transform(raw,id){// id 为 文件名 raw 为文件内容
          if (nodeAPI.test(raw)){
            return `const ${raw} = require("${id}")`
          }
        }
    }
}



// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src/render'),
  server:{
    port: +process.env.PORT,
  },
  build: {
    assetsDir: ".",
    outDir: "pre_build/render",
  },
  optimizeDeps:{
    exclude:['keyevent',"Stats","Dirent","fs",'path']
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
