/*
 * @Author: your name
 * @Date: 2021-01-26 11:58:52
 * @LastEditTime: 2021-02-19 13:44:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\node\utilInterface.ts
 */
import { Tree } from "../js/DataStructure/Tree";

interface Config{
    // [key:string]:string[] | null
    film:string
    store:string
}
interface checkline{
    dir:string,
    state:boolean
}
interface img{
  file:string
  lable:string
}
interface View{
    sibebar:boolean
    viewline:img[]
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


export {State,checkline,img,Config}