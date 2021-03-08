
// import * as fs from "fs";
// import * as path from "path";
import fs from "fs"
import path from "path"
import { Dirent } from "fs";
import { LinkedList } from "../core/DataStructure/LinkedList";

export class Files {

  /**
   * 记录添加的次数以做throttle
   * @type {number}
   * @memberof File
   */
  addTimes: number = 0;
  addTimes1:number=0;
  times:number=0;
  /**
   * [constructor description]
   * @return {[File]} [description]
   */
  constructor(){
    // this.handlesecondpath=this.handlesecondpath.bind(this)
  }
  /**
   * [fsReadDir description]
   * @param  {[type]} dir [description]
   * @return {[Promise<Dirent[]>]}     [description]
   */
 static fsReadDir(dir: string): Promise<Dirent[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, { withFileTypes: true }, (err: any, files: Dirent[]) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
  }

async * FileTree(level:number,dirPath: string,LinkedList:LinkedList){
  switch (level) {
    case 1:{ 
      let firstlayer:string[]=[] 
      let paths: Dirent[] = await Files.fsReadDir(dirPath);
      paths.sort(Files.compareFiles)
      let len:number = 0
      while (++len<paths.length){
        if(paths[len].isFile()&&Files.getFileType(paths[len].name)){
        firstlayer.push(path.join(dirPath,paths[len].name))
        this.addTimes1++
        if (this.addTimes1>6) {
          this.addTimes1=0
          LinkedList.append(firstlayer)
          this.times++
          yield 
          firstlayer=[]
        }
        }
      }
      if (firstlayer.length!=0) {// 处理小于 6 的情况
        LinkedList.append(firstlayer)
        firstlayer=[]
        this.times++
      }
      break;
    }
    case 2:{ //判断小于 30 的情况
      let secondlayer:string[]=[]
      let paths: Dirent[] = await Files.fsReadDir(dirPath);
      paths.sort(Files.compareFiles)
      paths.reverse()
      let len:number = paths.length
      while (len--) {
        if (paths[len].isDirectory()) {
          let abspath = path.join(dirPath,paths[len].name)
          let path2s: Dirent[] = await   Files.fsReadDir(abspath);
          path2s.sort(Files.compareFiles)
          path2s.reverse()
          let len2:number = path2s.length
          while (len2--) {
            const abspath2 = path.join(abspath,path2s[len2].name);
            if(path2s[len2].isFile()&&Files.getFileType(path2s[len2].name)){//第二层视频
            secondlayer.push(abspath2)
              if (this.addTimes>30) {
                this.addTimes=0
                LinkedList.append(secondlayer)
                this.times++
                yield 
                secondlayer=[]
              }
              this.addTimes++;
            }
          }
          if (secondlayer.length!=0) { // 处理第二层单层
            LinkedList.append(secondlayer)
            secondlayer=[]
          }
        }
      }
      if (secondlayer.length!=0) { // 当每第二层相加总数小于 30
        LinkedList.append(secondlayer)
        secondlayer=[]
        this.times++
      }
      break;
    }
  }
  //#region 
  // paths.sort(File.compareFiles);
  // let len:number = paths.length
  // while (len--){
  //   const abspath = path.join(dirPath,paths[len].name);
  //   if(paths[len].isFile()&&this.getFileType(paths[len].name)){
  //     // Tree.add(abspath, dirPath, Tree.traverseBF);
  //     // this.addTimes++;
  //   }
  //   else if (paths[len].isDirectory()){
      // let path2s: Dirent[] = await  this.fsReadDir(abspath);
  //     // path2s.sort(File.compareFiles)
  //     let len2:number = path2s.length
  //     while (len2--) {
  //       const abspath = path.join(paths[len].name,path2s[len].name);
  //       if(paths[len].isFile()&&this.getFileType(paths[len].name)){
  //     // Tree.add(abspath, dirPath, Tree.traverseBF);
  //         this.addTimes++;
  //       }
  //     }
  //     // this.FileTree2(abspath, Tree, callback);
  //   }
  //   // else if(this.level<2){
  //   else {
  //     paths.splice(len,1)
  //   }
  // }
  // if(this.level<2) this.level++
  //#endregion
}

  /**
   * [getFileType description: 检查文件是否为视频文件,是：返回 true 否：返回 false]
   * @param  {[type]} name [description]
   * @return {[BOOL]}      [description]
   */
  static getFileType(name: string):boolean {
    let videosuffix = [
      "3gp",
      "avi",
      "flv",
      "rm",
      "rmvb",
      "mov",
      "mkv",
      "mp4",
      "mpeg",
      "mpg",
      "wmv",
      "ts",
    ];
    //let imagesuffix = ["gif", "jpeg", "jpg", "bmp", "webp", "png"]

    return RegExp(".(" + videosuffix.join("|") + ")$", "i").test(name.toLowerCase()) ? true : false
  }


  /**
   * 文件夹（文件名：非英文字符按Unicode，英文开头>数字开头）>文件
   * @static
   * @param {string} a
   * @param {string} b
   * @return {*}  {number}
   * @memberof Files
   */
  static compareFiles(a: string, b: string): number;
  static compareFiles(a: Dirent, b: Dirent): number;
  static compareFiles(a: any, b: any) {
    // 我的实际问题是处理文件名所以全部为字符串
    // 而在这些字符串中前有字母
    const LetterPrefixRegex = /[a-z]+/i; //i 忽略大小写
    if (typeof a === "string" && typeof b === "string") {
      return Number(LetterPrefixRegex.test(a)) &&
        !Number(LetterPrefixRegex.test(b))
        ? 1
        : !LetterPrefixRegex.test(a) && Number(LetterPrefixRegex.test(b))
        ? -1
        : a.localeCompare(b, "zh");
    } else if ("filename" in a && "filename" in b) {
      return Number(LetterPrefixRegex.test(a.filename)) &&
        !Number(LetterPrefixRegex.test(b.filename))
        ? 1
        : !LetterPrefixRegex.test(a.filename) &&
          Number(LetterPrefixRegex.test(b.filename))
        ? -1
        : a.filename.localeCompare(b.filename, "zh");
    } else {
      return Number(b.isDirectory()) - Number(a.isDirectory()) ||
        (Number(LetterPrefixRegex.test(a.name)) &&
          !Number(LetterPrefixRegex.test(b.name)))
        ? 1
        : !LetterPrefixRegex.test(a.name) &&
          Number(LetterPrefixRegex.test(b.name))
        ? -1
        : a.name.localeCompare(b.name, "zh");
    }
    // || new Intl.Collator().compare(a.name,b.name)
    // || a.name.localeCompare(b.name,'zh')
    /** 由于短路运算符 || 的原因
     *  当为两个文件或文件夹时， (true  - true  为  0 false ) 会直接返回 || 右边的表达式
     *  当为文件夹和文件时，     (true  - false 为  1 false ) 会直接返回 || 左边的表达式
     *  当为文件和文件夹时，     (false - true  为 -1 false ) 会直接返回 || 左边的表达式
     */
    // string Dirent
    // || new Intl.Collator().compare(a.name,b.name)
    // || a.name.localeCompare(b.name,'zh')
  }
}


