/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow,protocol } from 'electron'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '../../.env') })

let win = null

function createWin() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
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
app.whenReady().then(createWin)
