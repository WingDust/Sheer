/*
 * @Author: wingdust
 * @Date: 2020-09-03 23:19:46
 * @LastEditTime: 2021-02-18 09:52:10
 * @LastEditors: Please set LastEditors
 * @Description: 用于保存一些工具函数，并导出给外部使用
 * @FilePath: \electron-vue-vite\src\render\node\config.ts
 */
import fs from "fs";
import path from "path";
import child_pross from "child_process";

import { File } from "../js/libary";
// interface
import { picture, checkline } from "./utilInterface";



/**
 * 调用opencv读取视频第一帧并保存成文件
 * @param film 视频文件路径
 * @param ThumbnailPath 保存帧文件路径
 */
function getPicture(film:string,ThumbnailPath:any) {
    // console.log(__dirname);
    // "" 来去除文件名带有空格等其它情况
    let run = `E:\\python\\python3.8.1\\python.exe .\\src\\render\\python\\picture.py "${film}" ${ThumbnailPath}`
    let python = child_pross.exec(run,{encoding:'utf-8'})
    const decoder = new TextDecoder('gbk')

    python.stdout!.on('data',function(data:any){
    //   console.log(typeof(data));

    // console.log(decoder.decode(data));
    })
    python.stderr!.on('data',function(data:any){
    console.log(decoder.decode(data));
    })

    python.on('close',function(code:number){
    if (code !== 0) {//0 为执行成功
    console.log(code);
    }
    })
}

function picturepath(viewpaths:Array<checkline>):picture[]{
  let picture:picture[]=[];
  for (const p of viewpaths) {
    try {
      let files = fs.readdirSync(p.dir)
      let picutres:picture[] =files.map(file=> {
        let d:picture = Object.create(null)
        d.filename=file
        d.dirname=p.dir+'/'
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

function fmtpath(LinkedList:string[][],store:string) {
 return LinkedList.map((lines)=>{
    for (let line of lines) {
      line=path.resolve(store,path.basename(line))
      return line
    }
  })
}

async function initwasm(init:any) {
  const {add} = await init()
  return add
}

const renamefile = (p:picture,val:string)=>{
  try {
    fs.rename(p.dirname+p.filename,p.dirname+val,()=>{})
  } catch (error) {
    
  }
}


export {  getPicture, picturepath,initwasm,renamefile,fmtpath}