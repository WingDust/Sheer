/*
 * @Author: your name
 * @Date: 2020-09-08 01:21:26
 * @LastEditTime: 2021-01-27 11:00:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\store\state.ts
 */


// interface
import { State } from "../node/utilInterface";

// TODO 这个每一项需要写注释
export const state:State = {
    ConfigYaml:{
        Yaml:Object.create(null),
        status:0
    },
    FilmPath:{
        Trees:Object.create(null),
        status:false,
        checkline:Object.create(null)
    },
    Flag:{
        flag:false,
        times:0
    },
    View:{// 有关于视图
        sibebar:false,// 表示侧边栏的显隐状态
        viewline:Object.create(null)
    }
}

// export type State = typeof state