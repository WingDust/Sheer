/*
 * @Author: your name
 * @Date: 2021-01-26 11:58:52
 * @LastEditTime: 2021-01-26 15:44:41
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
        viewline:Array<checkline>
    }
    interface State{
        ConfigYaml:{
            Yaml:ConfigYaml | null
            status:number
            },
        FilmPath:{
            Trees:Tree | undefined
            status:boolean
            checkline:Array<checkline>
        }
        Flag:Flag
        View:View
    }

export {ConfigYaml,Flag,State,checkline}