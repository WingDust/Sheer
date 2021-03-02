/*
 * @Author: wingdust
 * @Date: 2020-09-03 23:19:46
 * @LastEditTime: 2021-02-19 21:25:10
 * @LastEditors: Please set LastEditors
 * @Description: 用于保存一些工具函数，并导出给外部使用
 * @FilePath: \electron-vue-vite\src\render\node\config.ts
 */
import fs from "fs";
import { Dirent } from "fs";
import path from "path";
import child_pross from "child_process";

// interface
import {Config,Img} from "./utilInterface";
import { ipcRenderer } from "electron";
import { Files } from "./lib";



/**
 * 调用opencv读取视频第一帧并保存成文件
 * @param film 视频文件路径
 * @param ThumbnailPath 保存帧文件路径
 */
export function generatorimg(film:string,filename:string,ThumbnailPath:string) {
    // "" 来去除文件名带有空格等其它情况
    let run = `E:\\python\\python3.8.1\\python.exe  .\\src\\render\\python\\picture.py "${film}" "${filename}" "${ThumbnailPath}"`
    // let python = child_pross.exec(run,{encoding:'utf-8'})
    let python = child_pross.exec(run,{encoding:"buffer"})
    const decoder = new TextDecoder('gbk')

    python.stdout!.on('data',function(data:any){
      // console.log(data);
      // console.log(typeof(data));
      console.log(decoder.decode(data));
    })
    python.stderr!.on('data',function(data:any){
      // console.log(data);
      // console.log(typeof(data));
      console.log(decoder.decode(data));
    })

    python.on('close',function(code:number){
    if (code !== 0) {//0 为执行成功
    console.log(code);
    }
    })
}


export function fmtpath(LinkedList:string[][],Config:Config):Img[] {
 return LinkedList.flat().map((n)=>{
    let img:Img = Object.create(null)
    img.file=path.basename(n)
    img.lable=n.replace(Config.film,"").replace(img.file,"")
    return img
  })
}

export async function initwasm(init:any) {
  const {add} = await init()
  return add
}

// const renamefile = (p:img,val:string)=>{
//   try {
//     fs.rename(p.dirname+p.filename,p.dirname+val,()=>{})
//   } catch (error) {
    
//   }
// }


export async function getlable(config:string) {
  let lablelayer:string[]=[]
  let paths: Dirent[] = await Files.fsReadDir(config);
  paths.sort(Files.compareFiles)
  paths.reverse()
  let len:number = paths.length
  while(len--){
    if (paths[len].isDirectory()) {
      lablelayer.push(paths[len].name)
    }
  }
  return lablelayer
}

interface Event{
  channel:string
  handler:(e:Electron.IpcRendererEvent,m:any)=>any
}

export function listen(...args:Event[]) {
  for (const i of args) {
    ipcRenderer.on(i.channel,i.handler)
  }
}

function ab2str(buf:ArrayBuffer) {
  // return String.fromCharCode.apply(null,new Uint16Array(buf))
  
}
function str2ab(p:string):ArrayBuffer {
  let buf = new ArrayBuffer(p.length*2) // 每个字符占用2个字节
  let bufview = new Uint16Array(buf)
  for (let i = 0; i < p.length; i++) {
     bufview[i] = p.charCodeAt(i);
  }
  return buf
}