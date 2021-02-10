/*
 * @Author: your name
 * @Date: 2021-02-09 11:56:33
 * @LastEditTime: 2021-02-10 22:25:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\server\main.ts
 */

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { ipcRenderer  } from 'electron'

import { Tree } from '@/js/DataStructure/Tree';
import { File } from "../js/libary";


console.log("asd");
ipcRenderer.on('messagefrommain', (event, arg) => {
    console.log(event);
    console.info('arg', arg)
    console.log(arg);
})
ipcRenderer.on('message-to-renderer', (event, arg) => {
    console.log(event);
    console.info('arg', arg)
    console.log(arg);
})

ipcRenderer.send('message-from-worker',"asdqqqq")


const fs = require("fs");
const path = require("path");
import { Stats, Dirent } from "fs";

interface data {
  dir: string;
  state: boolean;
}

 class Files {

  /**
   * 缓存这一层中待被检查的路径数组
   * @type {data[]}
   * @memberof File
   */
  cacheline: data[];
  /**
   * 监测 Tree 是否添加完成
   * @type {boolean}
   * @memberof File
   */
  flag: boolean;
  checkline: any[];
  /**
   * 缓存着下一层的文件夹，它会一小个的组合成一个大数组
   * @type {data[][]}
   * @memberof File
   */
  nextline: data[][];
  /**
   * 记录添加到 Tree 上的次数以做throttle
   * @type {number}
   * @memberof File
   */
  addTimes: number;
  level:number;
  /**
   * [constructor description]
   * @return {[File]} [description]
   */
  constructor() {
    this.cacheline = [];
    this.flag = false;
    //缓存根路径下每一层的文件夹，为一个数组嵌套
    this.checkline = [];
    this.nextline = [];
    this.addTimes = 0;
    this.level = 1;
  }
  /**
   * [fsReadDir description]
   * @param  {[type]} dir [description]
   * @return {[Promise<Dirent[]>]}     [description]
   */
  fsReadDir(dir: string): Promise<Dirent[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, { withFileTypes: true }, (err: any, files: Dirent[]) => {
        //异步 {withFileTypes:true}为 true 则为 Dirent[]
        if (err) {
          reject(err);
        }
        // console.log(files);
        resolve(files);
      });
    });
  }

  async FileTree2(dirPath: string, Tree: Tree, callback?: any) {
    let paths: Dirent[] = await this.fsReadDir(dirPath);
    paths.sort(File.compareFiles);
    let len:number = paths.length
    while (len--){
      const abspath = path.join(dirPath,paths[len].name);
      if(paths[len].isFile()&&this.getFileType(paths[len].name)){
        Tree.add(abspath, dirPath, Tree.traverseBF);
        this.addTimes++;
      }
      else if (paths[len].isDirectory()){
        let path2s: Dirent[] = await this.fsReadDir(paths[len].name);
        path2s.sort(File.compareFiles)
        let len2:number = path2s.length
        while (len2--) {
          const abspath = path.join(paths[len].name,path2s[len].name);
          if(paths[len].isDirectory()||paths[len].isFile()&&this.getFileType(paths[len].name)){
            Tree.add(abspath, dirPath, Tree.traverseBF);
            this.addTimes++;
          }
        }
        // this.FileTree2(abspath, Tree, callback);
      }
      // else if(this.level<2){
      else {
        paths.splice(len,1)
      }
    }
    this.flag=true
    // if(this.level<2) this.level++
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

    RegExp(".(" + videosuffix.join("|") + ")$", "i").test(name.toLowerCase()) ? true : false
  }


}
