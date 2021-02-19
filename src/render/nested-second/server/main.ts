/*
 * @Author: your name
 * @Date: 2021-02-09 11:56:33
 * @LastEditTime: 2021-02-19 13:48:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\server\main.ts
 */

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { ipcRenderer  } from 'electron'
import { Files } from "../../utils/lib";
import { LinkedList } from "../../utils/DataStructure/LinkedList";
import { fmtpath } from "../../utils/utilFn";
import child_pross from "child_process";
import { Config } from "../../public/Sheer.config";
import { TextDecoder } from 'util';
// import fs = require("fs");

let File = new Files()
let LinkedLists = new LinkedList()
let Proxy_Files = new Proxy(File,{
    set:function(target,propKey,value,receiver){
      if (propKey === 'times') {
        console.log(LinkedLists);
        for (const links of LinkedLists.toValueArray()) {
          for (const link of links) {
            generatorimg(link,Config.store)
          }
        }

        ipcRenderer.sendTo(1,'server',fmtpath(LinkedLists.toValueArray(),Config.store))
      }
    return Reflect.set(target,propKey,value,receiver);
    }
})
let gen =Proxy_Files.FileTree(2,Config.film,LinkedLists)
let s = gen.next()
console.log(s);


function generatorimg(film:string,ThumbnailPath:string) {
  
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



ipcRenderer.on('message-to-renderer', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg)
})

ipcRenderer.on('message-from-main', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg)
})


