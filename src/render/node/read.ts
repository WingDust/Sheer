const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

import { Tree } from "../js/DataStructure/Tree.js";
import { File } from "../js/libary";

const FilmYamlPath = path.join(__dirname, "../../../../../../src/render/public/film.yml")

export class ReadFileDir {
    Paths:any
    constructor() {
    }
    runtime(){

    }
    readfilmPath():void{
        try {
        const FilmPath = yaml.safeLoad(fs.readFileSync(FilmYamlPath,"utf8"))
        this.Paths = FilmPath
        } catch (error) {
        console.log(error);
        }
    }

    async readFileRecurise(){
        let Trees = new Tree(this.Paths[0])
        let file = new File()
        const T = await file.FileTree(this.Paths[0],Trees,null)
        console.log(file);
        // console.log(Trees);
        return Trees
    }
    

    /** 异步
     * 1.将路径下的 film.yml 读取并保留到变量中
     * 2.对每一个路径中的使用 File 进行 递归文件读取路径
     * 3.
     */

}

export function readfilmPath(): any {
  try {
    const doc = yaml.safeLoad(
      fs.readFileSync(
        path.join(__dirname, "../../../../../../src/render/public/film.yml"),
        "utf8"
      )
    );

    if (doc && Array.isArray(doc)) {
      console.log(new Tree(doc[0]));
      const l = new File();
      console.log(l.FileTree(doc[0], new Tree(doc[0]), null));
      console.log(l);
    }
    return doc;
  } catch (error) {
    console.log(error);
  }
}
