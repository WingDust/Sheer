/*
 * @Author: your name
 * @Date: 2021-01-26 11:58:52
 * @LastEditTime: 2021-02-17 22:10:33
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
interface picture{
  filename:string
  dirname:string
}
interface View{
    sibebar:boolean
    viewline:string[][]
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

const enum YamlError{
    Normal      = 0,
    None        = 1,        //0
    filmNone    =11,        //1
    filmPanic   =20,        //2
    storeNone   =31,        //3
    storePanic  =40         //4
}




export {State,checkline,YamlError,picture}