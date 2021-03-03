/*
 * @Author: your name
 * @Date: 2020-09-08 01:21:26
 * @LastEditTime: 2021-02-19 13:47:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\store\state.ts
 */

import { ipcRenderer} from "electron";

// interface
import { State } from "../utils/utilInterface";
// Config
import { Configs } from "../public/Sheer.config";

import { store } from "./index";
import { MutationTypes } from "./mutations";
import { getlable } from "../utils/utilFn";

// TODO 这个每一项需要写注释
export const state:State = {
    Config:Configs,
    FilmPath:{
        Trees:Object.create(null),
        status:false,
        checkline:Object.create(null)
    },
    View:{// 有关于视图
        sibebar:false,// 表示侧边栏的显隐状态
        viewline:Object.create(null)
    },
    Vim:{
      cursor:{
        postion:[0,0]
      },
      movtion:{
        Rename:false, // r
        Yank:false,   // y
        Del:false,    // x
      }
    }
}

getlable(Configs.film).then((lablelayer)=>{
  store.commit(MutationTypes.setcheckline,lablelayer)
})

ipcRenderer.on('ipc:2layer',(e,...arg)=>{
  console.log(arg);
  store.commit(MutationTypes.setViewline,arg[0])
})


//#region 变量声明
// let Yaml: ConfigYaml |null
// 用来保存文件树
// let Trees:Tree | undefined;
// 保存默认分组
// let checkline:Array<Array<checkline>>


/**
 * 导出的运行时函数
 * Yaml -> Proxy_File(root)=>Tree -> Proxy_Flag
 * 1. 读取 Yaml 文件
 * 2. 初始化文件树、响应式监听对象
 *   - (文件树为一次读取完并生成树对象)
 *   - (响应式监听对象当文件树对象读取完成后执行可选函数)
 * 
 * last. 保存至 state 对象属性上
 * @export
 */
// export function runtime() {
//   console.log("runtiming");
//   Yaml = readfilmPath(undefined) 
//   switch (valuenSure(Yaml)) {
//     case YamlError.Normal:{
//       // 初始化文件树
//       Trees =new Tree(Yaml!.film![0]);   // 2
//       getPath(Yaml!.film![0],Trees).then((result)=>{
//          checkline =result // result 为空待核查 @warning
//       }); // 3
//       break;
//     }
//     case YamlError.None:{
//       break;
//     }
//   }
//   console.log("runtime over");
// }

/**
 * 通过对 File 类的实例、进行 Proxy ，
 * 来监听这个对象上的 flag 属性，
 * 当 File 内部的 flag 被设置为 True 时
 * 意味着 Tree 加载完成
 * 再将 外部的 Proxy_FLAG 的 flag 设置为 True 
 * 就告知了文件树已经加载完成，确保后续依赖文件树的函数正常执行
 * @param Proxy_FLAG :读取完文件树将 Flag 设 True
 * @param root :本地视频文件的根路径
 * @param Tree :保存文件树的树形对象
 * @param callback :暂定的可选回调函数
 */
// async function getPath(root:any,Tree:Tree,callback?:any){
//   let file = new File();

// // 使用 Proxy 来做响应式监听读取文件树是否读取完成,读取的次数
//   let Proxy_file = new Proxy(file,{
//     set:function(target,propKey,value,receiver){
//       console.log(propKey);
//       if (propKey === 'flag') {
//       // if (propKey === 'level') {
//       // 当 flag 被设置时意味着文件树已经全部被读取完
//         console.log('Tree is ready');
//         // 改成依赖注入
//         // 这个是初始化设置state 的设置
//         // console.log(checkline);
//         store.commit(MutationTypes.setConfigYaml,Yaml)
//         store.commit(MutationTypes.setTrees,Trees)
//         // Trees!.traverseBF(cut)
//         let viewline = Viewcheckline(checkline,Trees!,Yaml!)
//         store.commit(MutationTypes.setViewline,picturepath(viewline))
//         // state.View.viewline= picturepath(viewline)
//       }
//     return Reflect.set(target,propKey,value,receiver);
//     }
//   });
//   await Proxy_file.FileTree(root,Tree,callback);
//   return Proxy_file.checkline
// }

/**
 * > 对这个函数做函数节流
 * > 判断函数运行完成
 * 我要生成代表视频文件的图片文件与其文件夹
 * @param {Node} currentNode
 */
// function cut(currentNode:Node){
//   const re= /\.(mp4|avi|mkv)/
//   if (currentNode.data.search(re) !== -1){//根据数据字符串来检索是否为合格视频文件
//   //当这个视频文件的文件深度不大于2时才会对视频文件进行操作
//     switch (currentNode.NodeDeepth()) {
//       case 1:{ 
//         getPicture(currentNode.data,Yaml!.store![0])
//         break;}
//       case 2:{ 
//         // G:\Feature film\动画\声之形剧场版.2017.HD720P.日语中字.mp4
//         let folderstr = currentNode.data.replace(Yaml!.film![0]+'\\','')
//         const re = /^.+\\/
//         let t = re.exec(folderstr)
//         let folder =path.join(Yaml!.store![0],t![0])
//         getPicture(currentNode.data,folder)
//         break;}
//       default:{
//         console.log(`${currentNode.data}:没有被切帧`);
//         break;}
//     }
//   }
// }

// function Viewcheckline(checkline:Array<Array<checkline>>,Tree:Tree,Yaml:ConfigYaml):Array<checkline> {
//   const viewfn:(line:checkline)=>checkline = (line) =>{ 
//     line.dir=line.dir.replace(Tree._root.data, Yaml.store![0]) 
//     return line
//   }
//   return checkline[0].map(viewfn)
// }

// runtime()

//#endregion
