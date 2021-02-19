/*
 * @Author: your name
 * @Date: 2021-01-26 11:58:52
 * @LastEditTime: 2021-02-19 14:29:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\node\utilInterface.ts
 */
import { Tree } from "../utils/DataStructure/Tree";

// 定义接口要 首字母大写
interface Config{
    // [key:string]:string[] | null
    film:string
    store:string
}
interface Img{
  file:string
  lable:string
}
interface View{
    sibebar:boolean
    viewline:Img[]
}
interface Vim{
    cursor:{
        postion:[number,number],
    },
    movtion:{
        Rename:boolean, 
        Yank:boolean,
        Del:boolean
    }
}
interface State{
    Config:Config,
    FilmPath:{
        Trees:Tree | undefined
        status:boolean
        checkline:string[]
    }
    View:View
    Vim:Vim
}


export {State,Img,Config}