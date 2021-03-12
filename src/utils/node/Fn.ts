
import fs from "fs";
import path from "path";
import { Dirent } from "fs";
import child_pross from "child_process";
import { Files } from "./lib";

// interface
import {Config,Img} from "../utilInterface";
// electorn
import { ipcRenderer } from "electron";

// 个人配置
import { Configs } from "../../render/public/Sheer.config";

/**
 * 调用opencv读取视频第一帧并保存成文件
 * @param film 视频文件路径
 * @param ThumbnailPath 保存帧文件路径
 */
export function generateimg(film:string,filename:any[],ThumbnailPath:string,times:number) {
  // "" 来去除文件名带有空格等其它情况
  let run = `E:\\python\\python3.8.1\\python.exe  .\\src\\render\\python\\picture.py "${film}" "${JSON.stringify(filename).replace(/\"/g,'\'')}" "${ThumbnailPath}"`
  // console.log(run);
  // let python = child_pross.exec(run,{encoding:'utf-8'})
  let python = child_pross.exec(run,{encoding:"buffer"})
  const decoder = new TextDecoder('gbk')

  python.stdout!.on('data',function(data:any){
    console.log(decoder.decode(data));
    if (decoder.decode(data).length===times) {
      // console.log(decoder.decode(data));
      ipcRenderer.send('ipc:message',fmtpath(filename,Configs))
    }
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

export function fmtpath(LinkedList:string[],Config:Config):Img[] { //@ 应依赖注入进
 return LinkedList.map((n)=>{
    let img:Img = Object.create(null)
    img.file=path.basename(n)
    img.lable=n.replace(Config.film,"").replace(img.file,"")
    // img.file=img.file.replace(/\.(mp4|mkv)/,'.jpg')
    return img
  })
}


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



/**
 * 对从根路径下读取出来最多一层的文件夹路径，
 * 对这个路径（G:\Feature film\China）进行取文件夹名
 * @export
 * @param {string} path
 * @return {*}  {(RegExpMatchArray | string |null)}
 */
export function getTagPath(path:string):RegExpMatchArray | string |null {
    // [获取地址栏url最后一个斜杠后面的字符串](https://blog.csdn.net/lihefei_coder/article/details/84799391)
     const re=/[^\\]+(?!.*\\)/
     return path.match(re)![0]
    //  return re[Symbol.match](path)
}

export function watch(filename:string) {
  try {
    fs.watch(filename)
  } catch (e) {
  }
}