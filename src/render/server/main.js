'use strict';

var electron = require('electron');

/*
 * @Author: your name
 * @Date: 2021-02-09 11:56:33
 * @LastEditTime: 2021-02-09 12:19:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\server\main.ts
 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
console.log("asd");
electron.ipcRenderer.on('messagefrommain', (event, arg) => {
    console.log(event);
    console.info('arg', arg);
    console.log(arg);
});
electron.ipcRenderer.on('message-to-renderer', (event, arg) => {
    console.log(event);
    console.info('arg', arg);
    console.log(arg);
});
electron.ipcRenderer.send('message-from-worker', "asdqqqq");
//# sourceMappingURL=main.js.map
