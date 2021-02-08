/*
 * @Author: your name
 * @Date: 2020-08-21 21:03:28
 * @LastEditTime: 2021-02-08 15:40:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\main\index.ts
 */
/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow,protocol,ipcMain } from 'electron'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '../../.env') })

let win: BrowserWindow | null = null
let serverwin: BrowserWindow | null = null

function createWin() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth:600,
    minHeight:270,
    autoHideMenuBar: true,
    frame:false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule:true,
      // webSecurity:false,
      // allowRunningInsecureContent:true
      // experimentalFeatures:true
    }
  })

  const URL = is_dev
    ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
    : `file://${join(__dirname, '../render/dist/index.html')}` // vite 构建后的静态文件地址

  win.loadURL(URL)
  /** 默认打开 devtool */
  win.webContents.openDevTools()
}

const createServerProcess = () =>{
  serverwin = new BrowserWindow({
    show:true,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  serverwin.loadFile(is_dev ? 'safe-file-protocol:://'+'../src/render/server.html':'')
  // 打包加载使用 loadFile
}

function sendWindowMessage(targetWindow:BrowserWindow, message:string, payload:any) {
  if (typeof targetWindow === 'undefined') {
    console.log('Target window does not exist')
    return
  }
  targetWindow.webContents.send(message, payload)
}

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
  ipcMain.on('message-from-worker', (event, arg) => {
    sendWindowMessage(win!, 'message-to-renderer', arg)
  })
  ipcMain.on('message-from-renderer', (event, arg) => {
    sendWindowMessage(serverwin!, 'message-from-main', arg)
  })
  ipcMain.on('ready', (event, arg) => {
    console.info('child process ready')
  })
})

// 
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.whenReady().then(createServerProcess).then(createWin)

/**
 * 监听渲染进程发出的信号触发事件
 */
ipcMain.on('min',e=>win!.minimize());
ipcMain.on('max',e=>{
  if (win!.isMaximized()) {
    win?.unmaximize()
  }else{
  win!.maximize()
  }
});
ipcMain.on('close',e=>win!.close())

