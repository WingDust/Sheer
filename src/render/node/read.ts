
import { readfilmPath  } from "./config";
import { Tree } from "../js/DataStructure/Tree.js";
import { File } from "../js/libary";
// import { registerRuntimeCompiler } from 'vue';
import { state } from '../store/index';


let Trees:any ;


/**
 * 用来判断 读取到路径是否完成写入树中
 */
interface Flag{
  flag:boolean
  times:number
}

let FLAG:Flag = Object.create(null); 
FLAG.flag = false;
FLAG.times = 0;


let Proxy_FLAG = new Proxy(FLAG,{
  get:function (target,propKey,receiver){
    console.log('get FLAG');
    return Reflect.get(target,propKey,receiver);
  },
  set:function(target ,propKey,value,receiver){
    console.log('set FLAG');
    if (propKey == 'flag') {
      console.log(value);
      state.state.FilmPath.data= Trees;
    }
    return Reflect.set(target,propKey,value,receiver);
  }
})


/**
 * 1. 读取到设定的根路径数组
 * 2. new 一个用来保存数据的 树结构
 * 3. new 一个用来读取文件路径的 File 工具类
 * 4. 根据 File 的实例 的属性来判断 函数的运行进度 ，如 ：在函数节流的情况下对 运行 60 次 为一次限额，+1
 * 5. 
 * 
 * 我需要
 * 一个固定全局的常量来保存 根路径数组
 * 以树结构形式进行一个全局保存的可变变量
 * 
 */



    /** 异步
     * 1.将路径下的 film.yml 读取并保留到变量中
     * 2.对每一个路径中的使用 File 进行 递归文件读取路径
     * 3.
     */


export function runtime() {
  const F = new ReadFileDir() 
  F.readfilmPath()                // 1
  Trees = new Tree(F.Paths[0]);   // 2
  getPath(F.Paths[0],Trees,undefined); // 3
  
}

async function getPath(root:any,Tree:Tree,callback:any){
  let file = new File();
  let Proxy_file = new Proxy(file,{
    set:function(target,propKey,value,receiver){
      console.log(propKey);
      if (propKey == 'flag') {
        console.log('right');
        Proxy_FLAG.flag=true
      }
    return Reflect.set(target,propKey,value,receiver);
    }
  });
  await Proxy_file.FileTree(root,Tree,callback);
}



export {Proxy_FLAG}
