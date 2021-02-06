/*
 * @Author: your name
 * @Date: 2020-09-08 01:21:54
 * @LastEditTime: 2021-02-06 21:57:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\store\mutations.ts
 */
import { MutationTree } from 'vuex';
import { State,ConfigYaml,picture } from "../node/utilInterface";

// TODO 需要做注释
export const enum MutationTypes{
    setConfigYaml="setConfigYaml",
    setConfigYamlStatus="setConfigYamlStatus",
    setTrees="setTrees",
    setViewStatus="setViewStatus",
    setViewline ="setViewline",
    setcheckline = "setcheckline ",
    callVimStatus = "callVimStatus "
}

type Mutation<S= State> = {
    [MutationTypes.setConfigYaml](state:S,value:any):void
}

export const mutations:Mutation & MutationTree<State> = {
    // []中为方法名 () 为参数类型断言
    [MutationTypes.setConfigYaml](state:State,value:ConfigYaml):void{
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
    },
    [MutationTypes.setViewline](state:State,value:Array<picture>){
        state.View.viewline=value
    },
    [MutationTypes.setcheckline](state:State,value:checkline[][]){
        state.FilmPath.checkline=value
    },
    [MutationTypes.callVimStatus](state:State,value:string){
        switch (value) {
            case 'h':{
                let result = state.Vim.cursor.postion[1]-=1
                if (result<0) { // 最小为 0
                    state.Vim.cursor.postion[1]=0
                }
                break;}
            case 'j':{
                state.Vim.cursor.postion[0]+=1;
                break;}
            case 'k':{
                let result = state.Vim.cursor.postion[0]-=1;
                if (result <0) {
                    state.Vim.cursor.postion[0]=0
                }
                break;}
            case 'l':{
                 let result = state.Vim.cursor.postion[1]+=1;
                 if (result >5) { // 6 列
                     state.Vim.cursor.postion[1]=5
                 }
                break;} // setVimCursorPosition
            case 'r':{
                state.Vim.movtion.Rename=true
                break;}
        }
    }
}
