
// import { registerRuntletmpiler } from 'vue';
import { readfilmPath, getPicture } from "./config";
import { File } from "../js/libary";
import { Tree } from "../js/DataStructure/Tree";
import { state } from '../store/state';
import { store } from "../store/index";
import { Flag,ConfigYaml } from "./config";

const fs = require("fs")

//#region 变量声明、初始化
const Yaml = readfilmPath(undefined) 
state.ConfigYaml.Yaml=Yaml
// valuenSure(Yaml);

let Trees:Tree | undefined;

let FLAG:Flag = Object.create(null); 
FLAG.flag = false;
FLAG.times = 0;

let Proxy_FLAG = new Proxy(FLAG,{
  set:function(target ,propKey,value,receiver){
    console.log('set FLAG');
    if (propKey === 'flag') {
      console.log(value);
      state.FilmPath.Trees= Trees;
      // store.commit(MutationTypes.setTrees,Trees)
      getPicture(Yaml!.store![0],"G:\\Feature film\\非洲女王号.BD1280高清中英双字.mp4")
  }
    return Reflect.set(target,propKey,value,receiver);
  }
})
//#endregion




/**
 * 完成 file 类的实例、并对这个实例进行 Proxy ，
 * 来监听这个对象上的 flag属性，
 * 来确认 Tree 加载完成
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
  // else{
  //   alert(`你的 film.yml \n⇒为空`)
  // }
}





