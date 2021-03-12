'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const chokidar_1 = tslib_1.__importDefault(require("chokidar"));
const electron_1 = require("electron");
const lib_1 = require("../../../utils/node/lib");
const LinkedList_1 = require("../../../utils/core/DataStructure/LinkedList");
const Fn_1 = require("../../../utils/node/Fn");
const Sheer_config_1 = require("../../public/Sheer.config");
let File = new lib_1.Files();
let LinkedLists = new LinkedList_1.LinkedList();
let Proxy_Files = new Proxy(File, {
    set: function (target, propKey, value, receiver) {
        if (propKey === 'times') {
            console.log(LinkedLists.toValueArray());
            let filename = LinkedLists.toValueArray().flat();
            Fn_1.generateimg(Sheer_config_1.Configs.film, filename, Sheer_config_1.Configs.store, filename.length);
        }
        return Reflect.set(target, propKey, value, receiver);
    }
});
let gen = Proxy_Files.FileTree(2, Sheer_config_1.Configs.film, LinkedLists);
gen.next();
electron_1.ipcRenderer.on('ipc:message', (event, ...arg) => {
    console.log('arg:', arg);
    gen.next();
});
const watcher = chokidar_1.default.watch(Sheer_config_1.Configs.film, {
    ignored: /\.(^mp4|^mkv)/,
    persistent: true,
    depth: 2
});
watcher
    .on('add', path => console.log(path))
    .on('addDir', path => console.log(path))
    .on('unlink', path => console.log(path))
    .on('unlinkDir', path => console.log(path));
//# sourceMappingURL=main.js.map
