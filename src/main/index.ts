/**
 * electron 主文件
 */
// import { join } from 'path'
import { app, BrowserWindow,protocol,ipcMain,contentTracing } from 'electron'
// import dotenv from 'dotenv'
// dotenv.config({ path: join(__dirname, '../../.env') })
import { createMainWin, createServerProcess,sendWindowMessage } from '../utils/electron/ElectronAPI';

console.log("\tMain 进程");

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

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.disableHardwareAcceleration()
app.whenReady()
.then(()=>{
  win = createMainWin(win)
  ipcMain.once('ipc:hello',(e,args)=>{
    serverwin1 = createServerProcess(serverwin1,"first") // 窗口id 2
    serverwin2 = createServerProcess(serverwin2,"second") // 窗口id 3
  })
  ipcMain.on('ipc:message',(e,args)=>{
    console.log("\t"+e.processId);//调试时重新加载会导致的死进程，以致processId 变化
    
    // console.log(args);
    // console.log(args==3);
    switch (e.processId) {
      case 4:{ //页面进程向服务进程发送请求
        if (args==10)sendWindowMessage(serverwin2!,"ipc:message",10) // 这里可等数据传后再展示页面
        if (args==7)sendWindowMessage(serverwin2!,"ipc:message",7)
        // console.log(serverwin2);
        break;
      }
      case 7:{ // 由服务进程向页面进程发送数据
        sendWindowMessage(win!,"ipc:message",[7,args])
        break;
      }
      case 10:{ // 第二层视频服务进程向页面进程发送数据 
        sendWindowMessage(win!,"ipc:message",[10,args])
        break;
      }
    }
  })



  ipcMain.on('min',e=>win!.minimize());
  ipcMain.on('max',e=>{
    if (win!.isMaximized()) {
      win?.unmaximize()
    }else{
    win!.maximize()
    }
  });
  ipcMain.on('close',e=>win!.close())
})