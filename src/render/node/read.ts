/*
 * @Author: wingdust
 * @Date: 2020-09-03 16:10:28
 * @LastEditTime: 2020-12-18 11:12:38
 * @LastEditors: Please set LastEditors
 * @Description: 读取文件树的运行函数文件
 * @FilePath: \electron-vue-vite\src\render\node\read.ts
 */

// import { registerRuntletmpiler } from 'vue';
import { readfilmPath, getPicture } from "./config";
import { File } from "../js/libary";
import { Tree,Node } from "../js/DataStructure/Tree";
import { state } from '../store/state';
// import { store } from "../store/index";
import { Flag,ConfigYaml } from "./config";

const path = require('path');


/**
 * Yaml -> Proxy_File(root)=>Tree -> Proxy_Flag
 * 1. 读取 Yaml 文件并保存至 state 对象属性上
 * 2. 初始化文件树、响应式监听对象
 *   - (文件树为一次读取完并生成树对象)
 *   - (响应式监听对象当文件树对象读取完成后执行可选函数)
 * 3. 
 */

//#region 变量声明、初始化

/** @type {*} */
const Yaml = readfilmPath(undefined) 
state.ConfigYaml.Yaml=Yaml

// 用来保存文件树
let Trees:Tree | undefined;
// 保存默认分组
let checkline:any

// 使用空对象用 Proxy 来做响应式监听读取文件树是否读取完成,读取的次数
let FLAG:Flag = Object.create(null); 
FLAG.flag = false;
FLAG.times = 0;
//        |
//        |
//        v
// Proxy对象，监听读取文件树
let Proxy_FLAG = new Proxy(FLAG,{
  // 当 FLAG 的属性 flag 被设置时意味着文件树已经全部被读取完
  set:function(target ,propKey,value,receiver){
    console.log('set FLAG');
    if (propKey === 'flag') {
      // console.log(value);
      state.FilmPath.Trees= Trees;
      state.Flag.flag=true//这个是预先设置state 的设置
      state.FilmPath.checkline=checkline
      Trees!.traverseBF(cut)

  }
    return Reflect.set(target,propKey,value,receiver);
  }
})
//#endregion


/**
 * > 对这个函数做函数节流
 * > 判断函数运行完成
 * 我要生成代表视频文件的图片文件与其文件夹
 * @param {Node} currentNode
 */
function cut( currentNode:Node){
  const re= /\.(mp4|avi)/
  if (currentNode.data.search(re) !== -1){//根据数据字符串来检索是否为合格视频文件
  //当这个视频文件的文件深度不大于2时才会对视频文件进行操作
    switch (currentNode.NodeDeepth()) {
      case 1:{ 
        getPicture(currentNode.data,Yaml!.store![0])
      break;}
      case 2:{ 
        // G:\Feature film\动画\声之形剧场版.2017.HD720P.日语中字.mp4
        let folderstr = currentNode.data.replace(Yaml!.film![0]+'\\','')
        const re = /^.+\\/
        let t = re.exec(folderstr)
        let folder =path.join(Yaml!.store![0],t![0])
        getPicture(currentNode.data,folder)
      break;}
      default:{
        console.log(`${currentNode.data}:没有被切帧`);
      break;}
    }
  }
}


// ==============================================

let c = [77,33,44,66,55]
c.sort((a:any,b:any)=>{
if (a<b){ console.log(c); return -1;}
if (a>b){ console.log(c); return 1;}
return 0;
})

const fs = require("fs")

function compareFiles(a:any,b:any){
    // return b.isDirectory() - a.isDirectory() || a.name > b.name ? 1 : -1;
    // return a.name < b.name ? -1 : 1;
    return a.name.localeCompare(b.name)
}

fs.readdir('G:\\Feature film',{withFileTypes:true},function(err:any,items:any){
    items.sort(compareFiles)
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        if (!items[i].name.startsWith(".")) {
            if(items[i].isFile()){

            } else{
                
            }
            
        }
        
    }
})

// ==============================================


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
async function getPath(Proxy_FLAG: any,root:any,Tree:Tree,callback:any){
  let file = new File();

  let Proxy_file = new Proxy(file,{
    set:function(target,propKey,value,receiver){
      console.log(propKey);
      if (propKey == 'flag') {
        console.log('right');
        Proxy_FLAG.flag=true// 改成依赖注入
        //typeof Proxy
      }
    return Reflect.set(target,propKey,value,receiver);
    }
  });
  await Proxy_file.FileTree(root,Tree,callback);
  return Proxy_file.checkline
}



/**
 * 导出的运行时函数
 * @export
 */
export function runtime() {
  if (Yaml && Yaml.film) {
    // 初始化树
  Trees =new Tree(Yaml.film[0]);   // 2

  getPath(Proxy_FLAG,Yaml.film[0],Trees,undefined).then((result)=> checkline =result); // 3
  }
  // else{
  //   alert(`你的 film.yml \n⇒为空`)
  // }
}