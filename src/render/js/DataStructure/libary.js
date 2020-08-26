// import fs from 'fs'
// import path from 'path'

const fs = require("fs");
const path = require("path");

class Tool {
  constructor() {}
}

export class File extends Tool {
  /**
   * [constructor description]
   * @return {[type]} [description]
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
  fsReadDir(dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        //异步
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
  }

  /**
   * [fsStat description: 异步 对传入的路径进行异步的文件、文件夹，信息读取，并返回一个，包含信息的Stat对象]
   * @param  {[type]} path [description]
   * @return {[stat]}      [description]
   */
  fsStat(path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stat) => {
        if (err) {
          reject(err);
        }
        // console.log(stat);
        resolve(stat);
      });
    });
  }

  /**
   * [FileTree description]
   * @param {[type]}   dirPath  [description]
   * @param {[type]}   Tree     [description]
   * @param {Function} callback [description]
   */
  async FileTree(dirPath, Tree, callback) {
    /**
     * 1. 查找到所有这一层的路径
     * 2. 将这一层中视频文件截取出来，添加到树中
     * 3. 对这一层中每个路径与路径的文件信息组成一个对应数组对象
     * 4. 根据数组对象，抽出为文件夹的路径，并储存成带bool的检察数组
     * 5. 
     * 6. 子目录递归
     */

    // 1
    let paths = await this.fsReadDir(dirPath);

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
     * 所以这里采用  Promise 来将这段异步方法整合成 
     * 包含所有异步状态而组成的一个对象，
     */
    //#endregion

    // 3
    let promises = paths.map((file) => {
      return this.fsStat(path.join(dirPath, file)); //异步
    });

    let datas = await Promise.all(promises).then((stats) => {
      //异步
      for (let index = 0; index < paths.length; index++) {
        paths[index] = path.join(dirPath, paths[index]);
      }
      return { stats, paths };
    });

    // 4 同步
    this.remainingPath(datas, dirPath);
    // 对检察数组中路径判断是否已检查，是：设为 True 否 ：设为 False
    // this.cacheline.map((data)=>{
    // console.log(Tree.getNodeDeepth(data.dir));
    // })

    // 5 同步
    this.emptyPath(dirPath, Tree);

    // if (paths.length==0) return;

    // 6 
    /** 对这一层子目录进行递归 */
    datas.stats.forEach((stat) => {
      const isFile = stat.isFile();
      const isDir = stat.isDirectory();
      if (isDir) {
        this.FileTree(datas.paths[datas.stats.indexOf(stat)], Tree, callback);
        // console.log((this.a += 1) + " a"); //每一个目录都会+1 可以用来记录文件夹总数
        // console.log("\n");
      }
      if (isFile) {
        //添加一个判断是否为视频文件，根据文件的后缀名
        console.log(datas.paths[datas.stats.indexOf(stat)]);
        // console.log("\n");
      }
    });
  }

  /**
   * [RemainingPath description: 检测这一层余下的文件夹，
   * 这些文件夹代表下一层递归将执行多少次递归，
   * 将这些文件夹储存在 this.cacheline]
   * @param {[type]} data [description]
   */
  remainingPath(datas, dirPath) {
    // 这个第一层根路径下的子文件夹添加
    /** cacheline的长度为 0 时表示这一层被检查的已全部检查完，或者是它是在 */
    if (this.cacheline.length == 0) {
      //根路径层下子文件夹，也是第一次循环
      datas.stats.forEach((stat) => {
        if (stat.isDirectory()) {
          //这个目录有文件 则还需要递归
          let data = {};
          data.dir = datas.paths[datas.stats.indexOf(stat)];
          data.state = false;
          this.cacheline.push(data);
        }
      });
    } else {
      /**
       *  如果对 cacheline 遍历时，每一个为true后不能被遍历，能减少运算
       */
      this.cacheline.find((data) => {
        if (data.dir == dirPath) {
          data.state = true;
          //
          if (datas.paths.length != 0) {
            let layers = [];
            datas.stats.forEach((stat) => {
              if (stat.isDirectory()) {
                let data = {};
                data.dir = datas.paths[datas.stats.indexOf(stat)];
                data.state = false;
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
  emptyPath(dirPath, Tree) {
    /** 先检查这一层是否有路径在缓存 cacheline 中 */

    /** ====================== Start ====================== */

    /** 检查是否全部为true */
    if (Tree._root.data != dirPath) { //根路径是不进行检查 ,用来减少遍历计算
      let flag = true;//验证缓存中的要被检查的路径是否被检查完
      for (const data of this.cacheline) {
        if (data.state != true) {
          flag = false;
        }
      }
      if (flag == true) {
        if (this.cacheline.length != 0) {
          this.checkline.push(this.cacheline);
          this.cacheline = [];
          this.cacheline = this.cacheline.concat(this.nextline.flat());
          this.nextline = [];
        }
      }
      console.table(this.checkline);
    }
    /** ====================== End ====================== */
  }

  /**
   * [checkFile description:对这一层中视频与路径添加到树上]
   * @param  {[type]} paths   [description:这一层所查询到所有子文件、子目录]
   * @param  {[type]} Tree    [description:树结构]
   * @param  {[type]} dirPath [description:当前被查路径]
   */
  checkFile(paths, Tree, dirPath) {
    /** ====================== Start ====================== */
    /**
     * 达成：
     * 对这一层所有路径遍历，
     * 并在遍历的同时将找出非视频索引，将视频文件添加到树上
     * 在最后删除这一层的非视频文件。
     */
    let deleteIndex = [];
    paths.map((item, index) => {
      /** 被查路径与子路径拼接 */
      const abspath = path.join(dirPath,item)
      /**在它是文件情况下*/
      if (fs.statSync(abspath).isFile()) {
        /**它为视频文件情况下 */
        if (this.getFileType(item)) {
          Tree.add(abspath, dirPath, Tree.traverseBF);
        } else {
          /**它为非视频情况下 */
          deleteIndex.push(index);
        }
      } else {
        Tree.add(abspath, dirPath, Tree.traverseBF);
      }
    });
    /** 清除这一层非视频 */
    if (deleteIndex.length != 0) {
      for (const i of deleteIndex) {
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
  getFileType(name) {
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

  /**
   * [getFilefullpath description:将被]
   * @param  {[type]} dirPath [description]
   * @param  {[type]} paths   [description]
   * @return {[type]}         [description]
   */
  getFilefullpath(dirPath, paths) {
    return path.join(dirPath, paths);
  }
}

/**
 * 导出类
 *
 */
// export default {
//   install(Vue,options){
//     Vue.prototype.File = File,
//     Vue.prototype.CommonFunction = CommonFunction
//   }

// }
