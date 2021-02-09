/*
 * @Author: your name
 * @Date: 2021-02-09 11:56:33
 * @LastEditTime: 2021-02-09 16:30:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\server\main.ts
 */

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { ipcRenderer  } from 'electron'

import { Tree } from '@/js/DataStructure/Tree';
import { File } from "../js/libary";


console.log("asd");
ipcRenderer.on('messagefrommain', (event, arg) => {
    console.log(event);
    console.info('arg', arg)
    console.log(arg);
})
ipcRenderer.on('message-to-renderer', (event, arg) => {
    console.log(event);
    console.info('arg', arg)
    console.log(arg);
})

ipcRenderer.send('message-from-worker',"asdqqqq")





