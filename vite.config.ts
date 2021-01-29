/*
 * @Author: your name
 * @Date: 2020-08-21 21:03:28
 * @LastEditTime: 2021-01-29 10:16:01
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\vite.config.ts
 */
/**
 * 参考链接: https://github.com/vitejs/vite/blob/master/src/node/config.ts
 */
import { join } from 'path'
import { UserConfig } from 'vite'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '.env') })

const config: UserConfig = {
  root: join(__dirname, 'src/render'),
  port: +process.env.PORT,
  base: './',
  optimizeDeps:{
    exclude:['keyevent','fs']
  }
}

export default config
