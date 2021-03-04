
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { ipcRenderer  } from 'electron'
import { Files } from "../../../utils/node/lib";
import { LinkedList } from "../../../utils/core/DataStructure/LinkedList";
import { generateimg } from "../../../utils/node/Fn";
import { Configs } from "../../public/Sheer.config";
// import { remote } from "electron";
// console.log(remote.getCurrentWindow().id);

// import { TextDecoder } from 'util';

let File = new Files()
let LinkedLists = new LinkedList()
let Proxy_Files = new Proxy(File,{
    set:function(target,propKey,value,receiver){
      if (propKey === 'times') {
        console.log(LinkedLists.toValueArray());
        let filename = LinkedLists.toValueArray().flat()
        generateimg(Configs.film,filename,Configs.store,filename.length)
      }
    return Reflect.set(target,propKey,value,receiver);
    }
})
let gen =Proxy_Files.FileTree(2,Configs.film,LinkedLists)
let s = gen.next()
// console.log(s);


ipcRenderer.on('ipc:layer2', (event:Electron.IpcRendererEvent, ...arg) => {
    // console.log(event);
    console.log('arg:', arg)
    gen.next()
})


ipcRenderer.on('message-from-main', (event, ...arg) => {
    // console.log(event);
    console.info('arg', arg)
})


