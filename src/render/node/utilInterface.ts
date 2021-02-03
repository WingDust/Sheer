/*
 * @Author: your name
 * @Date: 2021-01-26 11:58:52
 * @LastEditTime: 2021-02-03 12:06:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\node\utilInterface.ts
 */
import { Tree } from "../js/DataStructure/Tree";

interface ConfigYaml{
    // [key:string]:string[] | null
    film:string[] | null
    store:string[] | null
}
interface Flag{
    flag:boolean
    times:number
}
interface checkline{
    dir:string,
    state:boolean
}
interface View{
    sibebar:boolean
    viewline:Array<picture>
}
interface State{
    ConfigYaml:{
        Yaml:ConfigYaml | null
        status:number
        },
    FilmPath:{
        Trees:Tree | undefined
        status:boolean
        checkline:Array<Array<checkline>>
    }
    Flag:Flag
    View:View
}

const enum YamlError{
    Normal      = 0,
    None        = 1,        //0
    filmNone    =11,        //1
    filmPanic   =20,        //2
    storeNone   =31,        //3
    storePanic  =40         //4
}

interface picture{
  filename:string
  dirname:string
}



export {ConfigYaml,Flag,State,checkline,YamlError,picture}