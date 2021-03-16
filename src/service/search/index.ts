
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// const env = import.meta.env

import { ipcRenderer  } from 'electron'
import { Files } from "../../utils/node/lib";
import { LinkedList } from "../../utils/core/DataStructure/LinkedList";
import { Configs } from "../public/Sheer.config";
// import { TextDecoder } from 'util';
console.log(process.pid);

