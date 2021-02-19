/*
 * @Author: wingdust
 * @Date: 2020-09-03 23:19:46
 * @LastEditTime: 2021-02-19 11:02:18
 * @LastEditors: Please set LastEditors
 * @Description: 用于保存一些工具函数，并导出给外部使用
 * @FilePath: \electron-vue-vite\src\render\node\config.ts
 */
import fs from "fs";
import path from "path";
import child_pross from "child_process";

// interface
import { img} from "./utilInterface";
// Config
import { Config } from "../public/Sheer.config";



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

function fmtpath(LinkedList:string[][],store:string):img[] {
 return LinkedList.flat().map((n)=>{
    // let re=/.+\\/
    let img:img = Object.create(null)
    img.file=path.basename(n)
    img.lable=n.replace(Config.film,"").replace(img.file,"")
    return img
  })
}

async function initwasm(init:any) {
  const {add} = await init()
  return add
}

// const renamefile = (p:img,val:string)=>{
//   try {
//     fs.rename(p.dirname+p.filename,p.dirname+val,()=>{})
//   } catch (error) {
    
//   }
// }


export {  getPicture,initwasm,fmtpath}