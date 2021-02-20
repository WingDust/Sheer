/*
 * @Author: your name
 * @Date: 2020-08-21 21:03:28
 * @LastEditTime: 2021-02-20 10:26:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\main\index.ts
 */
/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow,protocol,ipcMain,contentTracing } from 'electron'
import dotenv from 'dotenv'
import { createMainWin, createServerProcess,sendWindowMessage } from "./lib/ElectronAPI";
// require("@electron/remote/main").initialize()

console.log("Main 进程");

dotenv.config({ path: join(__dirname, '../../.env') })

var win: BrowserWindow | null = null
var serverwin1: BrowserWindow | null = null
var serverwin2: BrowserWindow | null = null




app.on('ready',async ()=>{
  // [Electron doesn't allow windows with webSecurity: true to load files](https://stackoverflow.com/questions/61623156/electron-throws-not-allowed-to-load-local-resource-when-using-showopendialog/61623585#61623585)
  const protocalName = 'safe-file-protocol'
  protocol.registerFileProtocol(protocalName,(request,callback)=>{
    const url = request.url.replace(`${protocalName}:://`,'')
    try {
      return callback(decodeURIComponent(url))
    } catch (error) {
      console.error(error);
    }
  })
})

// 
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.disableHardwareAcceleration()
app.whenReady()
// .then(()=>createMainWin(win,serverwin2))
// .then(()=>createServerProcess(serverwin1,"first"))
.then(()=>{
  createMainWin(win)
  createServerProcess(serverwin1,"first")
  createServerProcess(serverwin2,"second")

  ipcMain.on('min',e=>win!.minimize());
  ipcMain.on('max',e=>{
    if (win!.isMaximized()) {
      win?.unmaximize()
    }else{
    win!.maximize()
    }
  });
  ipcMain.on('close',e=>win!.close())
  ipcMain.on('message-from-server', (event, arg) => {
    sendWindowMessage(win!, 'server', arg)
  })
})



/**
 * 监听渲染进程发出的信号触发事件
 */
// ipcMain.on('message-from-renderer', (event, arg) => {
//   sendWindowMessage(serverwin!, 'message-from-main', "woooooooooh")
// })
// ipcMain.on('ready', (event, arg) => {
//   console.info('child process ready')
// })