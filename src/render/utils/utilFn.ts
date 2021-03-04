/*
 * @Author: wingdust
 * @Date: 2020-09-03 23:19:46
 * @LastEditTime: 2021-02-19 21:25:10
 * @LastEditors: Please set LastEditors
 * @Description: 用于保存一些工具函数，并导出给外部使用
 * @FilePath: \electron-vue-vite\src\render\node\config.ts
 */

// import fs = require("fs");














function ab2str(buf:ArrayBuffer) {
  // return String.fromCharCode.apply(null,new Uint16Array(buf))
  
}
function str2ab(p:string):ArrayBuffer {
  let buf = new ArrayBuffer(p.length*2) // 每个字符占用2个字节
  let bufview = new Uint16Array(buf)
  for (let i = 0; i < p.length; i++) {
     bufview[i] = p.charCodeAt(i);
  }
  return buf
}