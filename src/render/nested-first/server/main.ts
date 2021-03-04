/*
 * @Author: your name
 * @Date: 2021-02-09 11:56:33
 * @LastEditTime: 2021-02-17 19:50:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\server\main.ts
 */

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { ipcRenderer  } from 'electron'
import { Files } from "../../../utils/node/lib";
import { LinkedList } from "../../../utils/core/DataStructure/LinkedList";
import { Configs } from "../../public/Sheer.config";

let File = new Files()
let LinkedLists = new LinkedList()
let Proxy_Files = new Proxy(File,{
    set:function(target,propKey,value,receiver){
      if (propKey === 'times') {

      }
    return Reflect.set(target,propKey,value,receiver);
    }
})
let gen =Proxy_Files.FileTree(1,Configs.film,LinkedLists)


ipcRenderer.on('message-to-renderer', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg)
})

ipcRenderer.on('message-from-main', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg)
})