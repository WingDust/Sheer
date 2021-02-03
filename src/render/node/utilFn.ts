/*
 * @Author: wingdust
 * @Date: 2020-09-03 23:19:46
 * @LastEditTime: 2021-02-03 12:36:18
 * @LastEditors: Please set LastEditors
 * @Description: 用于保存一些工具函数，并导出给外部使用
 * @FilePath: \electron-vue-vite\src\render\node\config.ts
 */
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const child_pross = require("child_process")

import { File } from "../js/libary";
// interface
import { ConfigYaml,YamlError,picture } from "./utilInterface";


/**
 * 读取配置 Yaml 文件函数
 * @param {string} [p="../../../../../../src/render/public/film.yml"]
 * @return {*}  {(ConfigYaml | null)}
 */
function readfilmPath(p="../../../../../../src/render/public/film.yml"):ConfigYaml | null  {
    try {
        p = path.join(__dirname,p)
        let film:ConfigYaml | null = yaml.safeLoad(fs.readFileSync(p,"utf8"))
        return film
    } catch (error) {
        console.log(error);
        return null
    }
}

/**
 * 调用opencv读取视频第一帧并保存成文件
 * @param film 视频文件路径
 * @param ThumbnailPath 保存帧文件路径
 */
function getPicture(film:string,ThumbnailPath:any) {
    // console.log(__dirname);
    // "" 来去除文件名带有空格等其它情况
    let run = `E:\\python\\python3.8.1\\python.exe .\\src\\render\\python\\picture.py "${film}" ${ThumbnailPath}`
    // console.log(run);
    let python = child_pross.exec(run,{encoding:'arraybuffer'})
    const decoder = new TextDecoder('gbk')

    python.stdout.on('data',function(data:any){
    //   console.log(typeof(data));

    // console.log(decoder.decode(data));
    })
    python.stderr.on('data',function(data:any){
    console.log(decoder.decode(data));
    })

    python.on('close',function(code:number){
    if (code !== 0) {//0 为执行成功
    console.log(code);
    }
    })
}

/**
 * 值没有 值错误 有两个所以是 4 种可能
 * 第一位表示错误是什么，第二位表示错误等级
 * 1 空 语法错误 
 * 11 film 为空
 * 20 film 为非路径数组
 * 31 store 为空
 * 40 store 为非路径数组
 */
function valuenSure(p:ConfigYaml | null):YamlError {
  if (p === null){// yaml 为空文件或语法错误
    return YamlError.None
  }
  else if (p.film === null) {// film 为空
    return YamlError.filmNone
  }
  else{
    for (let i = 0; i < p!.film!.length; i++) {
        if(!fs.existsSync(p!.film![i])){
            return YamlError.filmPanic
        }
    }
  }
  if (p.store === null) {
    return YamlError.storeNone
  }
  else {
    for (let i = 0; i < p!.store!.length; i++) {
        if(!fs.existsSync(p!.store![i])){
        return YamlError.storePanic
        }
    }
  }
  return YamlError.Normal
// return store.commit(MutationTypes.setConfigYamlStatus,ValueError.storePanic)
}

function picturepath(viewpaths:Array<checkline>):picture[]{
  let picture:picture[]=[];
  for (const p of viewpaths) {
    try {
      let files = fs.readdirSync(p.dir) as string[]
      let picutres:picture[] =files.map(file=> {
        let d:picture = Object.create(null)
        d.filename=file
        d.dirname=p.dir
        return d
      })
      picture = picture.concat(picutres.sort(File.compareFiles))
    } catch (error) {
      // console.log(error);
    }
  }
  return picture
}

// function isPicture(p:picture|string):p is picture{
//   return (<picture>p).dirname !== undefined
// }
export { readfilmPath, getPicture, valuenSure, picturepath}