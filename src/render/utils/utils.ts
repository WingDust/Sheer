/*
 * @Author: your name
 * @Date: 2020-11-19 18:25:22
 * @LastEditTime: 2020-11-20 11:17:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\utils\utils.ts
 */


/**
 * 对从根路径下读取出来最多一层的文件夹路径，
 * 对这个路径（G:\Feature film\China）进行取文件夹名
 * @export
 * @param {string} path
 * @return {*}  {(RegExpMatchArray | string |null)}
 */
export function getTagPath(path:string):RegExpMatchArray | string |null {
    // [获取地址栏url最后一个斜杠后面的字符串](https://blog.csdn.net/lihefei_coder/article/details/84799391)
     const re=/[^\\]+(?!.*\\)/
     return path.match(re)![0]
    //  return re[Symbol.match](path)
 }