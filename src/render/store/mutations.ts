/*
 * @Author: your name
 * @Date: 2020-09-08 01:21:54
 * @LastEditTime: 2020-11-18 12:03:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\store\mutations.ts
 */
import { MutationTree } from 'vuex';
import { State } from "./state";

// TODO 需要做注释
export const enum MutationTypes{
    setConfigYaml="setConfigYaml",
    setConfigYamlStatus="setConfigYamlStatus",
    setTrees="setTrees",
    setViewStatus="setViewStatus"
}

type Mutation<S= State> = {
    [MutationTypes.setConfigYaml](state:S,value:number):void
}

export const mutations:Mutation & MutationTree<State> = {
    // []中为方法名 () 为参数类型断言
    [MutationTypes.setConfigYaml](state:State,value:number):void{
        state.ConfigYaml.Yaml=value
    },
    [MutationTypes.setConfigYamlStatus](state:State,value:number):void{
        state.ConfigYaml.status=value
    },
    [MutationTypes.setTrees](state:State,value:any):void{
            state.FilmPath.Trees=value
    },
    // 在函数中设立两个默认参数，先判断要改变值的信号，只需每一次将值改变成不同上一次就行
    [MutationTypes.setViewStatus](state:State,value:boolean=true):void{
        if (state.View.sibebar===value) {
        state.View.sibebar=false
        }else{
        state.View.sibebar=value
        }
    }
}