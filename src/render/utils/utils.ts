/*
 * @Author: your name
 * @Date: 2020-11-19 18:25:22
 * @LastEditTime: 2020-11-19 21:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\utils\utils.ts
 */

export function getTagPath(path:string) {
     const re=/(.*)\*/
     return re[Symbol.match](path)
 }