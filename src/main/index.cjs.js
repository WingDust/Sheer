"use strict";
var electron = require("electron");
var path = require("path");
const env = {VITE_PORT: "3344", BASE_URL: "/", MODE: "development", DEV: true, PROD: false};
function createMainWin(win2) {
  win2 = new electron.BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 600,
    minHeight: 270,
    autoHideMenuBar: true,
    frame: false,
    backgroundColor: "#eee",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });
  const URL = `http://localhost:${env.VITE_PORT}`;
  win2.loadURL(URL);
  win2.webContents.openDevTools();
  console.log(`	\u9875\u9762\u8FDB\u7A0B  ProcessId:${win2.webContents.getProcessId()}`);
  win2.show();
  return win2;
}
function createServerProcess(serverwin, name) {
  serverwin = new electron.BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });
  serverwin.loadFile(`${path.join(__dirname, `../../src/render/nested-${name}/index.cjs.js`)}`);
  serverwin.webContents.openDevTools();
  console.log(`	\u670D\u52A1\u8FDB\u7A0B ${name} ProcessId:${serverwin.webContents.getProcessId()}`);
  return serverwin;
}
function sendWindowMessage(targetWindow, message, payload) {
  if (typeof targetWindow === "undefined") {
    console.log("Target window does not exist");
    return;
  }
  targetWindow.webContents.send(message, payload);
}
console.log("	Main \u8FDB\u7A0B");
var win = null;
var serverwin1 = null;
var serverwin2 = null;
electron.app.on("ready", async () => {
  const protocalName = "safe-file-protocol";
  electron.protocol.registerFileProtocol(protocalName, (request, callback) => {
    const url = request.url.replace(`${protocalName}:://`, "");
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      console.error(error);
    }
  });
});
electron.app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
electron.app.disableHardwareAcceleration();
electron.app.whenReady().then(() => {
  win = createMainWin(win);
  electron.ipcMain.once("ipc:hello", (e, args) => {
    serverwin1 = createServerProcess(serverwin1, "first");
    serverwin2 = createServerProcess(serverwin2, "second");
  });
  electron.ipcMain.on("ipc:message", (e, args) => {
    console.log("	" + e.processId);
    switch (e.processId) {
      case 4: {
        if (args == 10)
          sendWindowMessage(serverwin2, "ipc:message", 10);
        if (args == 7)
          sendWindowMessage(serverwin2, "ipc:message", 7);
        break;
      }
      case 7: {
        sendWindowMessage(win, "ipc:message", [7, args]);
        break;
      }
      case 10: {
        sendWindowMessage(win, "ipc:message", [10, args]);
        break;
      }
    }
  });
  electron.ipcMain.on("min", (e) => win.minimize());
  electron.ipcMain.on("max", (e) => {
    if (win.isMaximized()) {
      win == null ? void 0 : win.unmaximize();
    } else {
      win.maximize();
    }
  });
  electron.ipcMain.on("close", (e) => win.close());
});
