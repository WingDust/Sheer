/*
 * @Author: your name
 * @Date: 2021-02-05 16:25:33
 * @LastEditTime: 2021-02-05 16:43:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\Webassemly\wast\add.d.ts
 */
// declare module 'add'{
//     export function add():BigInt;
// }
export const memory: WebAssembly.Memory;
export function add(): BigInt;