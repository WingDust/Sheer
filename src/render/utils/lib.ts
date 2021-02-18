
import * as fs from "fs";
import * as path from "path";
import { Dirent } from "fs";
import { LinkedList } from "./DataStructure/LinkedList";

 class Files {

  /**
   * 监测 Tree 是否添加完成
   * @type {boolean}
   * @memberof File
   */
  flag: boolean;
  /**
   * 记录添加到 Tree 上的次数以做throttle
   * @type {number}
   * @memberof File
   */
  addTimes: number;
  times:number;
  /**
   * [constructor description]
   * @return {[File]} [description]
   */
  constructor(){
    this.flag = false;
    this.addTimes = 0;
    this.times=0;
    // this.handlesecondpath=this.handlesecondpath.bind(this)
  }
  /**
   * [fsReadDir description]
   * @param  {[type]} dir [description]
   * @return {[Promise<Dirent[]>]}     [description]
   */
  fsReadDir(dir: string): Promise<Dirent[]> {
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
        let paths: Dirent[] = await this.fsReadDir(dirPath);
        paths.sort(Files.compareFiles)
        paths.reverse()
        let len:number = paths.length
        while (len--){ // 倒序
          if(paths[len].isFile()&&Files.getFileType(paths[len].name)){//第一层视频
          firstlayer.push(path.join(dirPath,paths[len].name))
          }
          else {
            paths.splice(len,1)
          }
        }
        if (firstlayer.length!=0) {
          LinkedList.append(firstlayer)
        }
       break;
     }
     case 2:{
        let secondlayer:string[]=[]
        let paths: Dirent[] = await this.fsReadDir(dirPath);
        paths.sort(Files.compareFiles)
        paths.reverse()
        let len:number = paths.length
        while (len--) {
          if (paths[len].isDirectory()) {
            let abspath = path.join(dirPath,paths[len].name)
            let path2s: Dirent[] = await  this.fsReadDir(abspath);
            path2s.sort(Files.compareFiles)
            path2s.reverse()
            let len2:number = path2s.length
            while (len2--) {
              const abspath2 = path.join(abspath,path2s[len2].name);
              if(path2s[len2].isFile()&&Files.getFileType(path2s[len2].name)){//第二层视频
              secondlayer.push(abspath2)
                if (this.addTimes>30) {
                  this.addTimes=0
                  this.times++
                  yield
                }
                this.addTimes++;
              }
            }
            if (secondlayer.length!=0) {
              LinkedList.append(secondlayer)
              secondlayer=[]
            }
          }
          else {
            paths.splice(len,1)
          }
        }
       break;
     }
   }
    this.flag=true
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

  // static compareFiles(a: picture, b: picture): number;
  static compareFiles(a: string, b: string): number;
  static compareFiles(a: Dirent, b: Dirent): number;
  static compareFiles(a: any, b: any) {
    // 我的问题是处理字符串前有字母
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

export {Files}