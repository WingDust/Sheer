import path from "path"

import { Mutation,MutationTree } from 'vuex';
import { State,Img, CorsurStatus } from "../../utils/utilInterface";
import { Files } from "../../utils/node/lib";
import { debounce, height, throttle } from "../../utils/Browser/Fn";
import { ipcRenderer } from 'electron';
import { Configs } from '../public/Sheer.config';
// import "../Webassemly/wast/add.wasm";

const send= throttle(()=> ipcRenderer.send('ipc:message',10),1500,true)

// TODO 需要做注释
export const enum MutationTypes{
    setSibeline="setSibeline",
    setViewStatus="setViewStatus",
    setViewline ="setViewline",
    setagline = "setagline",
    callVimStatus = "callVimStatus",
    adjustViewline ="adjustViewline ",
    setlastaction="setlastaction",
    setRename="setRename"
}

// type Mutation<S= State> = {
//     [MutationTypes.setConfigYaml](state:S,value:any):void
// }

// export const mutations:Mutation<State> & MutationTree<State> = {
export const mutations:MutationTree<State> = {
    // []中为方法名 () 为参数类型断言
    [MutationTypes.setSibeline](state:State,value:Img[]):void{
            state.View.sibeline=value
    },
    // 在函数中设立两个默认参数，先判断要改变值的信号，只需每一次将值改变成不同上一次就行
    [MutationTypes.setViewStatus](state:State,value:boolean=true):void{
        if (state.View.sibebar===value) {
        state.View.sibebar=false
        }else{
        state.View.sibebar=value
        }
    },
    [MutationTypes.setViewline](state:State,value:Img[]){
        state.View.viewline=value
    },
    [MutationTypes.setagline](state:State,value:string[]){
        state.View.tagline=value
    },
    [MutationTypes.callVimStatus](state:State,value:CorsurStatus){
        switch (value.keycode) {
            case 'h':{
                if (state.Vim.cursor.into){
                    let result = state.Vim.cursor.postion[1]-=1
                    if (result<0) { // 最小为 0
                        state.Vim.cursor.postion[1]=0
                    }
                }
                else{ // 离开副区
                    //height() 计算的是当前副区处于第几层，需要保存下来
                    state.Vim.cursor.sibepostion[1]=state.Vim.cursor.sibepostion[0]-height()// 当离开时，这个保存了是当前
                    state.Vim.cursor.postion[0]=state.Vim.cursor.postion[2]+height();// @判断滚动
                    state.Vim.cursor.into=true
                }
                break;}
            case 'j':{
                if (state.Vim.cursor.into){
                    let result =  state.Vim.cursor.postion[0]+=1;
                    let lines = Math.ceil(state.View.viewline.length/6)-1//向下取整
                    if (result > lines) { //已在最后一行 再触发行即请触发请求
                        send()
                        // ipcRenderer.send('ipc:message',10)
                    }
                    if (result==lines){ //进入最后一行
                        // 计算第一次进入最后一行
                        let remainder =state.View.viewline.length%6-1
                        if (state.Vim.cursor.postion[1]>remainder) {
                            state.Vim.cursor.postion[1]=remainder
                        }
                    }
                    else if (result>lines){
                        state.Vim.cursor.postion[0]=lines
                    }
                }
                else{
                    let result = state.Vim.cursor.sibepostion[0]+=1;
                    let len = state.View.sibeline.length -1
                    if (result>len) state.Vim.cursor.sibepostion[0]=len
                } 
                break;}
            case 'k':{
                if (state.Vim.cursor.into) {
                    let result = state.Vim.cursor.postion[0]-=1;
                    if (result <0) state.Vim.cursor.postion[0]=0
                }
                else{
                    let result = state.Vim.cursor.sibepostion[0]-=1;
                    if (result < 0) state.Vim.cursor.sibepostion[0]=0
                }
                break;}
            case 'l':{
                if (state.Vim.cursor.into){
                    let result = state.Vim.cursor.postion[1]+=1;
                    // 当为倒数第一行时
                    if (state.Vim.cursor.postion[0] == Math.ceil(state.View.viewline.length/6)-1) { // 通过向下取整 ，因为 positon 为 0 开始所以要 -1
                        let remainder =state.View.viewline.length%6-1 
                        if (result>remainder) {
                            state.Vim.cursor.postion[1]=remainder
                        }
                    }
                    else if (result >5) { // 6 列
                        state.Vim.cursor.postion[1]=5
                        // 进入副区
                        state.Vim.cursor.postion[2]=state.Vim.cursor.postion[0]-height()
                        state.Vim.cursor.sibepostion[0] = height()+state.Vim.cursor.sibepostion[1] 
                        state.Vim.cursor.into=false
                    }
                }
                break;}
            case 'r':{
                state.Vim.movtion.Rename=true
                break;}
            case 'x':{


            }
        }
    },
   async [MutationTypes.adjustViewline](state:State,value:string){
        let position = state.Vim.cursor.postion[0]*6+state.Vim.cursor.postion[1]
        let p = state.View.viewline[position] //浅拷贝
        await Files.renamefile(path.join(Configs.film,p.lable,p.file),path.join(Configs.film,p.lable,value+path.extname(p.file))) 
        await Files.renamefile(path.join(Configs.store,p.lable,p.file.replace(/\.(mp4|mkv)/,'.jpg')),path.join(Configs.film,p.lable,value+'.jpg')) 
        state.View.viewline[position].file=value+path.extname(p.file)
    },
    [MutationTypes.setRename](state:State){
        state.Vim.movtion.Rename=false
    },
    [MutationTypes.setlastaction](state:State,value:string|null){
        state.Vim.renamevil.lastaction=value
    }
}
