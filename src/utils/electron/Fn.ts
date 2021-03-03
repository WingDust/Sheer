
import { ipcRenderer } from "electron";

interface Event{
  channel:string
  handler:(e:Electron.IpcRendererEvent,m:any)=>any
}

export function listen(...args:Event[]) {
  for (const i of args) {
    ipcRenderer.on(i.channel,i.handler)
  }
}