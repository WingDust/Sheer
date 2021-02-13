'use strict';

var electron = require('electron');
var fs = require('fs');
var path = require('path');

/*
 * @Author: your name
 * @Date: 2020-12-07 12:45:04
 * @LastEditTime: 2020-12-07 12:46:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\js\DataStructure\Queue.ts
 *
 */
/**
 * @export
 * @class Queue [description: : JS队列]
 */
class Queue {
    /**
     *Creates an instance of Queue.
     * @memberof Queue
     * _oldstIndex
     * _newstIndex :
     * _storage
     */
    constructor() {
        this._oldstIndex = 1;
        this._newstIndex = 1;
        this._storage = {};
    }
    /**
     * [size description: 返回队列的数量大小,在获取队列大小时，它为一个最新的栈的编号，和一个最开始压栈的一个栈的编号，我需要维持它们原本编号的正确，
     * 例如，有五个栈，当删除了一个最前的一个栈，它的队列大小就是，用 6 - 2 = 4 ,在这其中6，_newstIndex:为队列中最大放入的数量,它应该是当前数量+1，_oldstIndex:为当前最开始的数据的编号]
     * @return {[type]} [description: number]
     */
    size() {
        return this._newstIndex - this._oldstIndex;
    }
    /**
     * [enqueue description: 将数据添加到队列中]
     * @param  {[type]} data [description: 要添加的数据]
     * @return {[type]}      [description: ]
     */
    enqueue(data) {
        this._storage[this._newstIndex] = data;
        this._newstIndex++;
    }
    /**
     * [dequeue description: ]
     * @return {[type]} [description: ]
     */
    dequeue() {
        let oldstIndex = this._oldstIndex, newstIndex = this._newstIndex, deletedData;
        if (oldstIndex != newstIndex) {
            deletedData = this._storage[oldstIndex];
            delete this._storage[oldstIndex];
            this._oldstIndex++;
            return deletedData;
        }
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }
    /**
     *
     * 使用 Node实例来获取当前节点深度
     * @return {*}  {(number)}
     * @memberof Node
     */
    NodeDeepth() {
        let that = this;
        let currentNodeDeepth = 0;
        for (; that.parent !== null; currentNodeDeepth++) {
            that = that.parent;
        }
        return currentNodeDeepth;
    }
}
class Tree {
    constructor(data) {
        let node = new Node(data);
        this._root = node;
        this.currentNodeDeepth = 1;
    }
    /**
     * [traverseDF description:  深度优先检索树 同步 Sync]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    traverseDF(callback) {
        (function recurse(currentNode) {
            for (let i = 0, length = currentNode.children.length; i < length; i++) {
                recurse(currentNode.children[i]);
            }
            callback(currentNode);
        })(this._root);
    }
    /**
     * [traverseBF description: 宽度优先检索树, ]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    traverseBF(callback) {
        let queue = new Queue();
        queue.enqueue(this._root);
        let currentNode = queue.dequeue();
        while (currentNode) {
            for (let i = 0, length = currentNode.children.length; i < length; i++) {
                queue.enqueue(currentNode.children[i]);
            }
            callback(currentNode);
            currentNode = queue.dequeue();
        }
    }
    /**
     * [contains description]
     * @param  {Function} callback  [description]
     * @param  {Function}   traversal [description]
     * @return {[type]}             [description]
     */
    contains(callback, traversal) {
        traversal.call(this, callback);
    }
    /**
     * [add description: 为 Node 添加 Node 子元素]
     * @param {[type]} data      [description: 要添加的数据]
     * @param {[type]} toData    [description: 为添加到那个节点上，用这个节点上的数据来表明]
     * @param {[type]} traversal [description: 以种方法来检索要被添加到的节点，用来添加]
     */
    add(data, toData, traversal) {
        let child = new Node(data), parent = null, callback = function (node) {
            if (node.data === toData) {
                parent = node;
            }
        };
        this.contains(callback, traversal);
        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        }
        else {
            throw new Error('Cannot add node to non-existent parent');
        }
    }
    remove(data, fromData, traversal) {
        let tree = this, parent = null, childToRemove = null, index;
        let callback = function (node) {
            if (node.data === fromData) {
                parent = node;
            }
        };
        this.contains(callback, traversal);
        if (parent) {
            index = tree.findIndex(parent.children, data);
            if (index === undefined) {
                throw new Error('Node to remove does not exist');
            }
            else {
                childToRemove = parent.children.splice(index, 1);
            }
        }
        else {
            throw new Error('Parent does not exist.');
        }
        return childToRemove;
    }
    /**
     * [findIndex description: ]
     * @param  {[type]} arr  [description]
     * @param  {[type]} data [description]
     * @return {number }      [description]
     */
    findIndex(arr, data) {
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].data === data) {
                index = i;
            }
        }
        return index;
    }
    /**
     * [getNodeDeepth description: 根据节点的数据来检测，返回节点的深度]
     * @param  {[type]} nodedata [description: 要检测节点的数据]
     * @return {[type]}          [description: number]
     */
    getNodeDeepth(nodedata) {
        //let that = this
        this.traverseBF((node) => {
            if (node.data == nodedata) {
                this.NodeDeepth(node);
            }
        });
        let currentNodeDeepth = this.currentNodeDeepth;
        // 当父节点查到 null即为 到顶将 当前节点深度置 1
        this.currentNodeDeepth = 1;
        return currentNodeDeepth;
    }
    /**
     * > 这个递归有问题
     * [NodeDeepth description: recursive式回计算节点的深度]
     * @param {[type]} node [description]
     */
    NodeDeepth(node) {
        if (node.parent !== null) {
            this.currentNodeDeepth++;
            this.NodeDeepth(node.parent);
        }
    }
}
// Vue 2.6
// export default {
//   install(Vue, options) {
//     Vue.prototype.Tree = Tree
//   }
// }

/*
 * @Author: your name
 * @Date: 2021-02-09 11:56:33
 * @LastEditTime: 2021-02-13 20:42:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\server\main.ts
 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
console.log("asd");
electron.ipcRenderer.on('messagefrommain', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg);
    console.log(arg);
});
electron.ipcRenderer.on('message-to-renderer', (event, ...arg) => {
    console.log(event);
    console.info('arg', arg);
    console.log(arg);
});
electron.ipcRenderer.send('message-from-worker', "asdqqqq");
class Files {
    /**
     * [constructor description]
     * @return {[File]} [description]
     */
    constructor() {
        this.flag = false;
        this.addTimes = 0;
        this.level = 1;
        this.handlesecondpath = this.handlesecondpath.bind(this);
    }
    /**
     * [fsReadDir description]
     * @param  {[type]} dir [description]
     * @return {[Promise<Dirent[]>]}     [description]
     */
    fsReadDir(dir) {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, { withFileTypes: true }, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    }
    *handlesecondpath(dirPath, path2s, Tree) {
        let len2 = path2s.length;
        while (len2--) {
            const abspath = path.join(path2s[len2].name, path2s[len2].name);
            if (path2s[len2].isFile() && Files.getFileType(path2s[len2].name)) {
                Tree.add(abspath, dirPath, Tree.traverseBF);
                if (this.addTimes > 4) {
                    this.addTimes = 0;
                    // yield
                }
                this.addTimes++;
            }
        }
    }
    async FileTree(dirPath, Tree, handle2) {
        let paths = await this.fsReadDir(dirPath);
        paths.sort(Files.compareFiles);
        let len = paths.length;
        while (len--) {
            const abspath = path.join(dirPath, paths[len].name);
            if (paths[len].isFile() && Files.getFileType(paths[len].name)) {
                Tree.add(abspath, dirPath, Tree.traverseBF);
            }
            else if (paths[len].isDirectory()) {
                Tree.add(paths[len].name, dirPath, Tree.traverseBF);
                let path2s = await this.fsReadDir(abspath);
                path2s.sort(Files.compareFiles);
                let handle = handle2(paths[len].name, path2s, Tree);
                handle.next();
            }
            else {
                paths.splice(len, 1);
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
        this.flag = true;
        // if(this.level<2) this.level++
    }
    /**
     * [getFileType description: 检查文件是否为视频文件,是：返回 true 否：返回 false]
     * @param  {[type]} name [description]
     * @return {[BOOL]}      [description]
     */
    static getFileType(name) {
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
        return RegExp(".(" + videosuffix.join("|") + ")$", "i").test(name.toLowerCase()) ? true : false;
    }
    static compareFiles(a, b) {
        // 我的问题是处理字符串前有字母
        const LetterPrefixRegex = /[a-z]+/i; //i 忽略大小写
        if (typeof a === "string" && typeof b === "string") {
            return Number(LetterPrefixRegex.test(a)) &&
                !Number(LetterPrefixRegex.test(b))
                ? 1
                : !LetterPrefixRegex.test(a) && Number(LetterPrefixRegex.test(b))
                    ? -1
                    : a.localeCompare(b, "zh");
        }
        else if ("filename" in a && "filename" in b) {
            return Number(LetterPrefixRegex.test(a.filename)) &&
                !Number(LetterPrefixRegex.test(b.filename))
                ? 1
                : !LetterPrefixRegex.test(a.filename) &&
                    Number(LetterPrefixRegex.test(b.filename))
                    ? -1
                    : a.filename.localeCompare(b.filename, "zh");
        }
        else {
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
let f = new Files();
let t = new Tree("G:\\Feature film/");
f.FileTree('G:\\Feature film/', t, f.handlesecondpath);
//# sourceMappingURL=main.js.map
