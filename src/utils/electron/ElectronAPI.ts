import { BrowserWindow } from "electron";
// import is_dev from 'electron-is-dev'
import { join } from 'path'

const env = import.meta.env
// console.log("\t"+env.VITE_PORT);

function createMainWin(win:BrowserWindow|null) {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth:600,
    minHeight:270,
    autoHideMenuBar: true,
    frame:false,
    backgroundColor:'#eee',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule:true,
      contextIsolation: false
      // webSecurity:false,
      // allowRunningInsecureContent:true
      // experimentalFeatures:true
    }
  })

  // const URL = is_dev
  //   ? `http://localhost:${env.VITE_PORT}` // vite 启动的服务器地址
  //   : `file://${join(__dirname, '../render/dist/index.html')}` // vite 构建后的静态文件地址
  const URL = `http://localhost:${env.VITE_PORT}`
  win.loadURL(URL)
  /** 默认打开 devtool */
  win.webContents.openDevTools()
  console.log(`\t页面进程  ProcessId:${win.webContents.getProcessId()}`);
  win.show()
  return win
}



function createServerProcess(serverwin:BrowserWindow |null,name:string){
  serverwin = new BrowserWindow({
    show:false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule:true,
      contextIsolation: false
    }
  })
  // serverwin.loadURL(is_dev ? `http://localhost:${process.env.PORT}/nested-${name}/index.html` :'file://'+'../src/render/nested/index.html')
  serverwin.loadFile(`${join(__dirname,`../../src/render/nested-${name}/index.cjs.js`)}`)
  // 打包加载使用 loadFile
  serverwin.webContents.openDevTools()
  // Dev id辨别使用
  console.log(`\t服务进程 ${name} ProcessId:${serverwin.webContents.getProcessId()}`);

  return serverwin
}

/**
 * 从主进程向渲染进程发送消息
 * @param {BrowserWindow} targetWindow
 * @param {string} message
 * @param {*} payload
 */
function sendWindowMessage(targetWindow:BrowserWindow, message:string, payload:any) {
  if (typeof targetWindow === 'undefined') {
    console.log('Target window does not exist')
    return
  }
  targetWindow.webContents.send(message, payload)
}

// function handler(params:type) {
  
// }
export { createMainWin,createServerProcess,sendWindowMessage }