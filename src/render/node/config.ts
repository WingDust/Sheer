const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const child_pross = require("child_process")
import { Tree } from "../js/DataStructure/Tree";

    interface ConfigYaml{
    [key:string]:string[] | null
    }
    interface Flag{
    flag:boolean
    times:number
    }
    interface State{
        flag:Flag
        configyaml:ConfigYaml | undefined
        FilmPath:{
            Trees:Tree | undefined
            status:boolean
        }
    }


/**
 * 读取路径数组函数
 */
function readfilmPath(p="../../../../../../src/render/public/film.yml"):ConfigYaml | null |undefined {
    try {
        p = path.join(__dirname,p)
        return yaml.safeLoad(fs.readFileSync(p,"utf8"))
    } catch (error) {
        console.log(error);
    }
}

function getPicture(ThumbnailPath:any,film:string ) {
    console.log(__dirname);
    // "" 来去除文件名带有空格等其它情况
    let run = `E:\\python\\python3.8.1\\python.exe .\\src\\render\\python\\picture.py "${film}" ${ThumbnailPath}`
    console.log(run);
    let python = child_pross.exec(run,{encoding:'arraybuffer'})
    const decoder = new TextDecoder('gbk')

    python.stdout.on('data',function(data:any){
      console.log(typeof(data));

      console.log(decoder.decode(data));
      })
      python.stderr.on('data',function(data:any){
      console.log(decoder.decode(data));
      })

      python.on('close',function(code:any){
      console.log(code);
      })
}


export { readfilmPath, getPicture,Flag,ConfigYaml}