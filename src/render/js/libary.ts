/*
 * @Author: your name
 * @Date: 2020-09-03 16:11:09
 * @LastEditTime: 2021-01-28 22:07:52
 * @LastEditors: Please set LastEditors
 * @Description: 对文件目录处理的工具类
 * @FilePath: \electron-vue-vite\src\render\js\libary.ts
 */
// import fs from 'fs'
// import path from 'path'

const fs = require("fs");
const path = require("path");
import {Stats,Dirent} from "fs"

class Tool {
  constructor() {}
}

// 待添加注释
interface data {
  dir: string;
  state: boolean;
}

export class File extends Tool {
  cacheline: any[];
  flag: boolean;
  checkline: any[];
  nextline: any[];
  /**
   * [constructor description]
   * @return {[File]} [description]
   */
  constructor() {
    super();
    //缓存这一层中待被检查的路径数组
    this.cacheline = [];
    /** */
    this.flag = false;
    //缓存根路径下每一层的文件夹，为一个数组嵌套
    this.checkline = [];
    //缓存着下一层的文件夹，它会一小个的组合成一个大数组
    this.nextline = [];
  }
  /**
   * [fsReadDir description]
   * @param  {[type]} dir [description]
   * @return {[type]}     [description]
   */
  fsReadDir(dir: string): Promise<Dirent[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, {withFileTypes:true},(err: any, files: Dirent[]) => {
        //异步 {withFileTypes:true}为 true 则为 Dirent[]
        if (err) {
          reject(err);
        }
        // console.log(files);
        resolve(files);
      });
    });
  }

  /**
   * [fsStat description: 异步 对传入的路径进行异步的文件、文件夹，信息读取，并返回一个，包含信息的Stat对象]
   * @param  {[ String]} path [description]
   * @return {[stat]}      [description]
   */
  fsStat(path: string): Promise<Stats> {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err: any, stat: any) => {
        if (err) {
          reject(err);
        }
        // console.log(stat);
        resolve(stat);
      });
    });
  }

  /**
   * [FileTree 异步对文件树进行添加]
   * @param {string}   dirPath  [视频文件根路径]
   * @param {[type]}   Tree     [被添加的文件树]
   * @param {Function} callback [可选回调函数]
   */
  async FileTree(dirPath: string, Tree: any, callback?: any) {

    /**
     * 1. 查找到所有这一层的路径
     * 2. 将这一层中视频文件截取出来，添加到树中
     * 3. 对这一层中每个路径与路径的文件信息组成一个对应数组对象
     * 4. 根据数组对象，抽出为文件夹的路径，并储存成带bool的检察数组
     * 5.
     * 6. 子目录递归
     */

    // 1
    let paths:Dirent[] = await this.fsReadDir(dirPath);
    // console.log(paths);
    paths.sort(File.compareFiles)

    // 2 同步
    this.checkFile(paths, Tree, dirPath);
    //#region
    /**
     * 这里为什么要使用 Promise :
     * 1.在对于这个本身就在 async 的函数中，应该以异步代码为主，这个函数 本身是用来异步的
     * 2.我要对这个数组中的每一个元素进行遍历
     * **用来将这个路径数组组成一个好处理的结构数组**，
     * 它是遍历方法包含又一个异步方法，数组的长度并不确定，
     * 也就是有多少个异步方法被执行也是不确定，
     * 所以这里采用 Promise 来将这段异步方法整合成
     * 包含所有异步状态而组成的一个对象，
     */
    //#endregion

    // 3
    let promises = paths.map((file:Dirent) => {
      return this.fsStat(path.join(dirPath, file.name)); //异步
    });

    let datas = await Promise.all(promises).then((stats) => {
      //异步
      let src:string[]=[];
      for (let index = 0; index < paths.length; index++) {
        src[index] = path.join(dirPath, paths[index].name) as string;
      }
      return { stats, src };
    });

    // 4 同步
    this.remainingPath(datas, dirPath);
    // 对检察数组中路径判断是否已检查，是：设为 True 否 ：设为 False
    // this.cacheline.map((data)=>{
    // console.log(Tree.getNodeDeepth(data.dir));
    // })

    // 5 同步
    this.emptyPath(dirPath, Tree);

    // if (paths.length===0) return;

    // 6
    /** 对这一层子目录进行递归 */
    datas.stats.forEach((stat:Stats) => {
      const isFile = stat.isFile();
      const isDir = stat.isDirectory();
      if (isDir) {
        this.FileTree(datas.src[datas.stats.indexOf(stat)], Tree, callback);
      }
      if (isFile) {
        //添加一个判断是否为视频文件，根据文件的后缀名
        // console.log(datas.src[datas.stats.indexOf(stat)]);
      }
    });
    // 结束这个函数
  }

  /**
   * [RemainingPath description: 检测这一层余下的文件夹，
   * 这些文件夹代表下一层递归将执行多少次递归，
   * 将这些文件夹储存在 this.cacheline]
   * @param {[type]} data [description]
   */
  remainingPath(datas: any, dirPath: any) {
    // 这个第一层根路径下的子文件夹添加
    /** cacheline的长度为 0 时表示这一层被检查的已全部检查完，或者是它是在 */
    if (this.cacheline.length == 0) {
      //根路径层下子文件夹，也是第一次循环
      datas.stats.forEach((stat: any) => {
        if (stat.isDirectory()) {
          //这个目录有文件 则还需要递归
          let data: data = {
            dir: datas.src[datas.stats.indexOf(stat)],
            state: false,
          };
          this.cacheline.push(data);
        }
      });
    } else {
      /**
       * 如果对 cacheline 遍历时，
       * 每一个为true后不能被遍历，能减少运算
       */
      this.cacheline.find((data: data) => {
        if (data.dir === dirPath) {
          data.state = true;
          //
          if (datas.src.length != 0) {
            let layers: {}[] = [];
            datas.stats.forEach((stat: { isDirectory: () => any }) => {
              if (stat.isDirectory()) {
                let data: data = {
                  dir: datas.src[datas.stats.indexOf(stat)],
                  state: false,
                };
                layers.push(data);
              }
            });
            if (layers.length != 0) {
              this.nextline.push(layers);
            }
          }
          return true;
        }
      });
    }
  }

  /**
   * [emptyPath description:验证并清除要被检查的路径]
   * @param  {[type]} dirPath [description]
   * @param  {[type]} Tree    [description]
   * @return {[type]}         [description]
   */
  emptyPath(dirPath: any, Tree: { _root: { data: any } }) {
    /** 先检查这一层是否有路径在缓存 cacheline 中 */

    /** ====================== Start ====================== */

    /** 检查是否全部为true */
    if (Tree._root.data != dirPath) {
      //根路径是不进行检查 ,用来减少遍历计算
      let flag = true; //验证缓存中的要被检查的路径是否被检查完
      for (const data of this.cacheline) {
        /** 当 this.cacheline 中路径的状态为真时，代表这一大层的目录全部被检查完
         *  并将 flag 设为 true
         */
        if (data.state != true) {
          flag = false;
        }
      }
      if (flag === true) {                       //当这一层实检查完
        if (this.cacheline.length != 0 ) {       //并且 缓存行中有路径存在
          if (this.nextline.length !=0) {
          this.checkline.push(this.cacheline);  //将 缓存行中这一大层被检查的路径数组，以顺序层次放入全部需要被检查路径大数组
          this.cacheline = [];                  //清空缓存行
          this.cacheline = this.cacheline.concat(this.nextline.flat()); //将相对于当前层，以树的下一顺序层，包含的所有待检查的路径，扁平化成一个数组对象
          // 在这个扁平化后，有可将其树的顺序层做一个分块的空间，来保存下来
          this.nextline = [];
          }
          else{
          // 最后一个递归
          this.checkline.push(this.cacheline);  //将 缓存行中这一大层被检查的路径数组，以顺序层次放入全部需要被检查路径大数组
          this.cacheline = [];                  //清空缓存行
          this.flag=true
          }
          
        }
      }
      // console.table(this.checkline);
    }
    /** ====================== End ====================== */
  }

  /**
   * [checkFile description:对这一层中视频与路径添加到树上]
   * @param  {[type]} paths   [description:这一层所查询到所有子文件、子目录]
   * @param  {[type]} Tree    [description:树结构]
   * @param  {[type]} dirPath [description:当前被查路径]
   */
  checkFile(
    paths: Dirent[],
    Tree: { add: (arg0: any, arg1: any, arg2: any) => void; traverseBF: any },
    dirPath: any
  ) {
    /** ====================== Start ====================== */
    /**
     * 达成：
     * 对这一层所有路径遍历，
     * 并在遍历的同时将找出非视频索引，将视频文件添加到树上
     * 在最后删除这一层的非视频文件。
     */
    let deleteIndex: any[] = [];
    paths.map((item: Dirent, index: any) => {
      /** 被查路径与子路径拼接 */
      const abspath = path.join(dirPath, item.name);
      /**在它是文件情况下*/
      if (fs.statSync(abspath).isFile()) {
        /**它为视频文件情况下 */
        if (this.getFileType(item.name)) {
          Tree.add(abspath, dirPath, Tree.traverseBF);
        } else {
          /**它为非视频情况下 */
          deleteIndex.push(index);
        }
      } else {
        Tree.add(abspath, dirPath, Tree.traverseBF);
      }
    });
    /** 通过逆向删除来剔除非视频文件 */
    if (deleteIndex.length != 0) {
      for (const i of deleteIndex.reverse()) {
        paths.splice(i, 1);
      }
    }
    /** ====================== End ====================== */
  }

  /**
   * [getFileType description: 检查文件是否为视频文件,是：返回 true 否：返回 false]
   * @param  {[type]} name [description]
   * @return {[BOOL]}      [description]
   */
  getFileType(name: string) {
    let videosuffix = [
      "avi",
      "wmv",
      "mkv",
      "mp4",
      "mov",
      "rm",
      "3gp",
      "flv",
      "mpg",
      "rmvb",
      "mpeg",
      "ts",
    ];
    //let imagesuffix = ["gif", "jpeg", "jpg", "bmp", "webp", "png"]

    if (
      RegExp(".(" + videosuffix.join("|") + ")$", "i").test(name.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  static compareFiles(a:string |Dirent,b:string |Dirent):number{
    // 我的问题是处理字符串前有字母
    const LetterPrefixRegex = /[a-z]+/i //i 忽略大小写
    if (typeof a === "string"&& typeof b === "string") {
      return 1
    }
    else if ( a instanceof Dirent &&  b instanceof Dirent) {
    return Number(b.isDirectory()) - Number(a.isDirectory())
    || (Number(LetterPrefixRegex.test(a.name)) 
    && !Number(LetterPrefixRegex.test(b.name))) ? 1: (!LetterPrefixRegex.test(a.name) 
    && Number(LetterPrefixRegex.test(b.name)))?-1:a.name.localeCompare(b.name,'zh')
    }
    // || new Intl.Collator().compare(a.name,b.name)
    // || a.name.localeCompare(b.name,'zh')
    /** 由于短路运算符 || 的原因 
     *  当为两个文件或文件夹时， (true  - true  为  0 false ) 会直接返回 || 右边的表达式
     *  当为文件夹和文件时，     (true  - false 为  1 false ) 会直接返回 || 左边的表达式
     *  当为文件和文件夹时，     (false - true  为 -1 false ) 会直接返回 || 左边的表达式
    */
   // string Dirent
}
}
