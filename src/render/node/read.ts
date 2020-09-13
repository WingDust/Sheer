
import { readfilmPath, getPicture } from "./config";
import { File } from "../js/libary";
import { Tree } from "../js/DataStructure/Tree";
import { state } from '../store/index';
import { Flag,ConfigYaml } from "./config";

// import { read_file } from "../../../../wasm/pkg/wasm";
// console.log(read_file);
/// <reference types="emscripten"/>
// let em_moudle = require("run")



// // /// <reference types="emscripten"/>
// // // const em_moudle = require("run")
// em_moudle['onRuntimeInitialized'] = onRuntimeInitialized

// function  onRuntimeInitialized() {
//   let a = '../assets/electron.png'
//   let b = em_moudle.ccall('hi','number',['string'],[a])
//   console.log(b);
// }


// import { registerRuntletmpiler } from 'vue';

//#region 变量声明、初始化
const Yaml = readfilmPath(undefined) 
let Trees:Tree | undefined;

let FLAG:Flag = Object.create(null); 
FLAG.flag = false;
FLAG.times = 0;

let Proxy_FLAG = new Proxy(FLAG,{
  set:function(target ,propKey,value,receiver){
    console.log('set FLAG');
    if (propKey === 'flag') {
      console.log(value);
      state.state.FilmPath.Trees= Trees;
      getPicture(Yaml!.store![0],"G:\\Feature film\\非洲女王号.BD1280高清中英双字.mp4")
  }
    return Reflect.set(target,propKey,value,receiver);
  }
})
//#endregion

const enum ValueError{
  None,     //0
  filmNone ,//1
  filmPanic,//2
  storeNone,//3
  storePanic//4
}
/**
 * 0 空 语法错误 
 * 1 film 为空
 * 2 film 为非路径数组
 * 3 store 为空
 * 4 store 为非路径数组
 */

// 值没有 值错误 有两个所以是 4 种可能
function valuenSure(p:ConfigYaml | null) {
  if (p === null){// yaml 为空文件或语法错误
    // state.state.ConfigYaml.status=0 // 默认为 空文件
    return 
  }
  if (p!.film === null) {// film 为
    return state.state.ConfigYaml.status = ValueError.filmNone
  }
  if (p!.film!) {
    
  }

  if (p!.store === null) {
    return state.state.ConfigYaml.status = ValueError.storeNone
  }
  
}



/**
 * 
 * @param Proxy_FLAG 
 * @param root 
 * @param Tree 
 * @param callback 
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
}


/**
 * 
 */
export function runtime() {
  if (Yaml && Yaml.film) {
  Trees =new Tree(Yaml.film[0]);   // 2

  getPath(Proxy_FLAG,Yaml.film[0],Trees,undefined); // 3
  }
  else{
    alert(`你的 film.yml \n⇒为空`)
  }
}





