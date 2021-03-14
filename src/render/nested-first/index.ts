process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import chokidar from "chokidar";
import { ipcRenderer  } from 'electron'
import { Files } from "../../utils/node/lib";
import { LinkedList } from "../../utils/core/DataStructure/LinkedList";
import { generateimg } from "../../utils/node/Fn";
import { Configs } from "../public/Sheer.config";

let File = new Files()
let LinkedLists = new LinkedList()
let Proxy_Files = new Proxy(File,{
    set:function(target,propKey,value,receiver){
      if (propKey === 'times') {
        let filename = LinkedLists.toValueArray().flat()
        generateimg(Configs.film,filename,Configs.store,filename.length)
      }
    return Reflect.set(target,propKey,value,receiver);
    }
})
let gen =Proxy_Files.FileTree(1,Configs.film,LinkedLists)
gen.next()

ipcRenderer.on('ipc:message', (event, ...arg) => {
    console.log('arg', arg)
    gen.next()
})


// let op:chokidar.WatchOptions = {}
const watcher =  chokidar.watch(Configs.film,{
  ignored:/\.(^mp4|^mkv)/,
  persistent:true,
  depth:1
}) 

watcher
.on('add',path=>console.log(path))
.on('addDir',path=>console.log(path))
.on('unlink',path=>console.log(path))
.on('unlinkDir',path=>console.log(path))