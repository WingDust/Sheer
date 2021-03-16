import {createServer,build,normalizePath} from 'vite'

import waitOn from 'wait-on'
import {join} from 'path'
import chalk from "chalk";
import { existsSync } from "fs";
require('dotenv').config({ path: join(__dirname, '../.env') })
// @ts-ignore
const electron = require('electron-connect').server.create({ stopOnClose: true });

// console.log("\t"+process.env.PORT);

const externals = ["electron", "electron-updater"];
const builtins = [
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "dns",
  "domain",
  "events",
  "fs",
  "fsevents",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "timers",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "zlib",
];

export const dft = [...builtins, ...externals];

let builded = 0

function start() {
    electron.electronState === 'init' ? electron.start() : electron.restart();
}

function BuildSecond() {
   return build({
    mode:'development',
    root:join(__dirname,'../src/service/second/'),
    });
}

function BuildFirst() {
   return build({
    mode:'development',
    root:join(__dirname,'../src/service/first/'),
    });
}

function BuildMain() {
   return build({ // 会检查根路径是否有 vite.config.ts
    mode:'development',
    root:join(__dirname,'../src/main/'),
    });
}


async function mainserver() {
    const server = await createServer({
        mode:'development',
        configFile:join(process.cwd(),'src/main/vite.config.ts')
    })

    await server.listen()
    server.watcher.on('change',async path=>{
        if (/\.(js|vue)$/.test(path)) return
        const log = chalk.green(`change -- ${path}`);
        console.log(log);
        // console.log(builded);
        // if (builded!==4&&builded!==5&&builded!==6) builded =0
        const normalizedPath = normalizePath(path)
        // if (builded==4) return
        if (normalizedPath.includes('/src/utils/electron')||normalizedPath.includes('/src/main')) {
            console.log('\tsart building main');
            await BuildMain()
            console.log('\tbuilded main');
            // builded = 4
            start()
        }
        if (normalizedPath.includes('/src/service/second')||normalizedPath.includes('/src/utils/node')) {
            console.log('\tsart building second');
            await BuildSecond()
            console.log('second builded');
            // builded = 5
            start()
        }
        if (normalizedPath.includes('/src/service/first')||normalizedPath.includes('/src/utils/node')) {
            console.log('\tstart building first');
            await BuildFirst()
            console.log('\tfirst builded');
            // builded = 6
            start()
        }
    })
}

waitOn({
    resources: [`http://localhost:${process.env.PORT}/index.html`],
    log: false,
  }, err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    if (existsSync('../src/main/index.cjs.js')) {
        start()
    }
    else{
        BuildMain()
        start()
    }
    mainserver()
})