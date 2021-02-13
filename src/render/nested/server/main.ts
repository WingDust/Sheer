/*
 * @Author: your name
 * @Date: 2021-02-09 11:56:33
 * @LastEditTime: 2021-02-13 20:42:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\server\main.ts
 */

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { ipcRenderer  } from 'electron'

import { Tree } from './Tree';
// import { File } from "./libary";

// import  path  from 'path'
// import  fs  from 'fs'
// import fs = require("fs");
import * as fs from "fs";
import * as path from "path";
// import path = require("path");
// const path = require("path");
import {  Dirent } from "fs";



console.log("asd");
ipcRenderer.on('messagefrommain', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg)
    console.log(arg);
})
ipcRenderer.on('message-to-renderer', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg)
    console.log(arg);
})

ipcRenderer.send('message-from-worker',"asdqqqq")


/*\
|*|
|*|
|*|
|*|
\*/

interface data {
  dir: string;
  state: boolean;
}

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
  level:number;
  /**
   * [constructor description]
   * @return {[File]} [description]
   */
  constructor(){
    this.flag = false;
    this.addTimes = 0;
    this.level = 1;
    this.handlesecondpath=this.handlesecondpath.bind(this)
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

  * handlesecondpath(dirPath:string,path2s:Dirent[],Tree:Tree){
    let len2:number = path2s.length
    while (len2--) {
      const abspath = path.join(path2s[len2].name,path2s[len2].name);
      if(path2s[len2].isFile()&&Files.getFileType(path2s[len2].name)){
      Tree.add(abspath, dirPath, Tree.traverseBF);
        if (this.addTimes>4) {
          this.addTimes=0
          // yield
        }
        this.addTimes++;
      }
    }
  }

 async FileTree(dirPath: string, Tree: Tree,handle2:(dirPath:string,path2s: Dirent[], Tree: Tree) => Generator<undefined, void, unknown> ) {
    let paths: Dirent[] = await this.fsReadDir(dirPath);
    paths.sort(Files.compareFiles)
    let len:number = paths.length
    while (len--){
      const abspath = path.join(dirPath,paths[len].name);
      if(paths[len].isFile()&&Files.getFileType(paths[len].name)){
        Tree.add(abspath, dirPath, Tree.traverseBF);
      }
      else if (paths[len].isDirectory()) {
        Tree.add(paths[len].name,dirPath , Tree.traverseBF);
        let path2s: Dirent[] = await  this.fsReadDir(abspath);
        path2s.sort(Files.compareFiles)
        let handle = handle2(paths[len].name,path2s,Tree)
        handle.next()
      }
      else {
        paths.splice(len,1)
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
    //#endregion
    console.log(Tree);
    this.flag=true
    // if(this.level<2) this.level++
  }

  /**
   * [getFileType description: 检查文件是否为视频文件,是：返回 true 否：返回 false]
   * @param  {[type]} name [description]
   * @return {[BOOL]}      [description]
   */
  static getFileType(name: string) {
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

let f = new Files()
let t = new Tree("G:\\Feature film/")
f.FileTree('G:\\Feature film/',t,f.handlesecondpath)
