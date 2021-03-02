/*
 * @Author: your name
 * @Date: 2021-02-09 11:56:33
 * @LastEditTime: 2021-02-19 14:23:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\server\main.ts
 */

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { ipcRenderer  } from 'electron'
import { Files } from "../../utils/lib";
import { LinkedList } from "../../utils/DataStructure/LinkedList";
import { fmtpath, generatorimg } from "../../utils/utilFn";
import { Config } from "../../public/Sheer.config";
// import { TextDecoder } from 'util';
// import fs = require("fs");

let File = new Files()
let LinkedLists = new LinkedList()
let Proxy_Files = new Proxy(File,{
    set:function(target,propKey,value,receiver){
      if (propKey === 'times') {
        console.log(LinkedLists);
        for (const links of LinkedLists.toValueArray()) {
          for (const link of links) {
            generatorimg(Config.film,link,Config.store)
          }
        }

        // let buffer = new ArrayBuffer(JSON.stringify(2).length*2)
        ipcRenderer.sendTo(1,'ipc:2layer',fmtpath(LinkedLists.toValueArray(),Config))
      }
    return Reflect.set(target,propKey,value,receiver);
    }
})
let gen =Proxy_Files.FileTree(2,Config.film,LinkedLists)
let s = gen.next()
console.log(s);





ipcRenderer.on('message-to-renderer', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg)
})

ipcRenderer.on('message-from-main', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg)
})


