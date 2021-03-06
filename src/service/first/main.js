'use strict';

var electron = require('electron');
var fs = require('fs');
var path = require('path');
var child_pross = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var child_pross__default = /*#__PURE__*/_interopDefaultLegacy(child_pross);

// import * as fs from "fs";
class Files {
    /**
     * [constructor description]
     * @return {[File]} [description]
     */
    constructor() {
        /**
         * 记录添加的次数以做throttle
         * @type {number}
         * @memberof File
         */
        this.addTimes = 0;
        this.addTimes1 = 0;
        this.times = 0;
        // this.handlesecondpath=this.handlesecondpath.bind(this)
    }
    static renamefile(oldName, newName) {
        return new Promise(resolve => {
            fs__default['default'].rename(oldName, newName, (e) => { if (e)
                throw e; });
            resolve('suc');
        });
    }
    /**
     * [fsReadDir description]
     * @param  {[type]} dir [description]
     * @return {[Promise<Dirent[]>]}     [description]
     */
    static fsReadDir(dir) {
        return new Promise((resolve, reject) => {
            fs__default['default'].readdir(dir, { withFileTypes: true }, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    }
    async *FileTree(level, dirPath, LinkedList) {
        switch (level) {
            case 1: {
                let firstlayer = [];
                let paths = await Files.fsReadDir(dirPath);
                paths.sort(Files.compareFiles);
                let len = 0;
                while (++len < paths.length) {
                    if (paths[len].isFile() && Files.getFileType(paths[len].name)) {
                        firstlayer.push(path__default['default'].join(dirPath, paths[len].name));
                        this.addTimes1++;
                        if (this.addTimes1 > 6) {
                            this.addTimes1 = 0;
                            LinkedList.append(firstlayer);
                            this.times++;
                            yield;
                            firstlayer = [];
                        }
                    }
                }
                if (firstlayer.length != 0) { // 处理小于 6 的情况
                    LinkedList.append(firstlayer);
                    firstlayer = [];
                    this.times++;
                }
                break;
            }
            case 2: { //判断小于 30 的情况
                let secondlayer = [];
                let paths = await Files.fsReadDir(dirPath);
                paths.sort(Files.compareFiles);
                paths.reverse();
                let len = paths.length;
                while (len--) {
                    if (paths[len].isDirectory()) {
                        let abspath = path__default['default'].join(dirPath, paths[len].name);
                        let path2s = await Files.fsReadDir(abspath);
                        path2s.sort(Files.compareFiles);
                        path2s.reverse();
                        let len2 = path2s.length;
                        while (len2--) {
                            const abspath2 = path__default['default'].join(abspath, path2s[len2].name);
                            if (path2s[len2].isFile() && Files.getFileType(path2s[len2].name)) { //第二层视频
                                secondlayer.push(abspath2);
                                if (this.addTimes > 30) {
                                    this.addTimes = 0;
                                    LinkedList.append(secondlayer);
                                    this.times++;
                                    yield;
                                    secondlayer = [];
                                }
                                this.addTimes++;
                            }
                        }
                        if (secondlayer.length != 0) { // 处理第二层单层
                            LinkedList.append(secondlayer);
                            secondlayer = [];
                        }
                    }
                }
                if (secondlayer.length != 0) { // 当每第二层相加总数小于 30
                    LinkedList.append(secondlayer);
                    secondlayer = [];
                    this.times++;
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
        // 我的实际问题是处理文件名所以全部为字符串
        // 而在这些字符串中前有字母
        const LetterPrefixRegex = /[a-z]+/i; //i 忽略大小写
        if (typeof a === "string" && typeof b === "string") { // 为纯字符串时的比较
            return Number(LetterPrefixRegex.test(a)) &&
                !Number(LetterPrefixRegex.test(b))
                ? 1
                : !LetterPrefixRegex.test(a) && Number(LetterPrefixRegex.test(b))
                    ? -1
                    : a.localeCompare(b, "zh");
        }
        else if ("filename" in a && "filename" in b) { // 为 Img 时的比较
            return Number(LetterPrefixRegex.test(a.filename)) &&
                !Number(LetterPrefixRegex.test(b.filename))
                ? 1
                : !LetterPrefixRegex.test(a.filename) &&
                    Number(LetterPrefixRegex.test(b.filename))
                    ? -1
                    : a.filename.localeCompare(b.filename, "zh");
        }
        else { // 为 Dirent 时的比较
            return Number(b.isDirectory()) - Number(a.isDirectory()) &&
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
        /** 由于短路运算符 && 的原因
         *  当 a,b 为两个文件或文件夹时，     (true  - true  为  0 true )  会直接返回 && 右边的表达式
         *  当 a 为文件夹和 b 为文件时，      (false - true  为 -1 false ) 会直接返回 && 左边的表达式
         *  当 a 为文件和 b 为文件夹时，      (true  - false 为  1 true )  会直接返回 && 左边的表达式
         */
        // string Dirent
        // || new Intl.Collator().compare(a.name,b.name)
        // || a.name.localeCompare(b.name,'zh')
    }
}

/**
 * [LinkedListNode description]
 */
class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
/**
 * [LinkedList description]
 */
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    /**对链表的头添加值
     * [prepend 对链表的头添加值]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    append(value) {
        const newNode = new LinkedListNode(value);
        /*
        当链表为空的时候
         */
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        /*
        链表不为空时
         */
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    }
    deleteHead() {
        /*
        当链表为空的时候 返回null
         */
        if (!this.head) {
            return null;
        }
        const deleteNode = this.head;
        if (!this.head.next) { //当头的下一个为空时，则表明链表中只有一个元素，将链表置为空链表
            this.head = null;
            this.tail = null;
        }
        else { //它被垃圾回收机制所清理了，没有了对它的引用
            this.head = this.head.next;
        }
        this.length--;
        return deleteNode; //可扩展的删除头节点
    }
    /** 删除尾部元素
     * [deleteTail 删除尾部元素]
     * @return {[type]} [description]
     */
    deleteTail() {
        const deleteTail = this.tail;
        if (!this.head) { //当为空链表时 返回空
            return null;
        }
        if (!this.head.next) { //1个节点
            this.head = null;
            this.tail = null;
            return deleteTail;
        }
        //至少有2个节点
        let currentNode = this.head;
        while (currentNode.next.next) {
            currentNode = currentNode.next;
        } //从头节点开始，一次向下查找2个节点(包括设定的开始节点)，当查找的第二个节点的next 不为空时，从上一次查找节点的开头+1 例如从头节点开始查寻，当头节点和头节点所连接的节点，也就是整体链表的第二个节点的next不为空时，从头节点+1个 查找下两个节点的.next 是否为空，当为空时，currentNode 就是我们要新生成的链表的尾节点,所以之后直接把 要新生成链表的尾节点也就是 currentNode.next 设为空，由垃圾回收机制来自动处理它 (当前还未删除尾节点，)
        currentNode.next = null;
        this.tail = currentNode;
        this.length--;
        return deleteTail;
    }
    /**
     * [delete description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    delete(value) {
        if (!this.head) {
            return null;
        }
        let deleteNode = null;
        while (this.head && this.head.value === value) {
            deleteNode = this.head;
            this.head = this.head.next;
        }
        let currentNode = this.head;
        if (currentNode) {
            while (currentNode.next) {
                if (currentNode.next.value === value) { //如果这个值是对象，因为引用的不同，则不会运行下去
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        this.tail = currentNode;
        return deleteNode;
    }
    deleteAt(index) {
        /*
        当链表为空的时候
        链表为一个节点
        找到要删除的节点，它是一定在链表的第二个节点至倒数第二个节点之间
        我直接从第二个开始检查
        当节点为3个时，只有在index等于1时才会运行到while,这里可以直接删除第二个节点,无须做判断
        如何删除
        我要找到删除节点的(index+1)下一个节点，把下一个节点的引用给删除节点的(index-1)上一个节点的next, 不需要移动头和尾节点
        我需要对删除的是哪个节点作出返回

        {value,use-{value,use-{value,null}}}
        {value1,next:use1}  use1={value2,use2}
        {value2,next:use2}  use2={value3,null}
        {value3,next:null}

        {value1,next:use2}  use2={value3,null}
        {value3,null}
         */
        if (!this.head) {
            return this;
        } //当链表为空的时候
        if (index < 0 || index > this.length) {
            return '索引超出';
        } //判断传入的索引是否在链表的长度中
        if (index === 0) { //删除第一个节点，已经包括了只有一个节点的链表
            let deleteNode = this.head;
            this.deleteHead();
            return deleteNode;
        }
        if (index === (this.length - 1)) {
            let deleteNode = this.tail;
            this.deleteTail();
            return deleteNode;
        }
        // if (!this.head.next && index === 0) { //这里使用this.tail 会有 空链表和只有一个节点的链表的区别分不开
        //     this.head = null
        //     this.tail = null
        // }
        if (this.length === 3) {
            let deleteNode = this.head.next;
            this.head.next = this.tail;
            this.length--;
            return deleteNode;
        }
        let currentNode = this.head.next; //第二个节点
        let amounts = 0;
        while (currentNode) {
            if ((index - 1) == amounts) {
                currentNode.next = currentNode.next.next;
                this.length--;
                return currentNode.next;
            }
            amounts++;
            currentNode = currentNode.next;
        }
    }
    /**  旋转链表
     * [reverse 旋转链表]
     * @return {[type]} [description]
     */
    reverse() {
        //记录头节点
        let curNode = this.head;
        let prevNode = null;
        let nextNode = null;
        //遍历链表
        while (curNode) {
            //存储下一个节点
            nextNode = curNode.next;
            //将当前节点指向前一个节点
            curNode.next = prevNode;
            //指针后移
            prevNode = curNode;
            curNode = nextNode;
        }
        //重置头指针和尾指针
        this.tail = this.head;
        this.head = prevNode;
        //返回链表
        return this;
    }
    /**
     * [toArray description]
     * @return {[Array]} [description]
     */
    toArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }
    /**
     * [fromArray description]
     * @return {[LinkedList]} [description]
     */
    fromArray(values) {
        values.forEach((value) => this.append(value));
        this.length = values.length;
        return this;
    }
    /** 得到链表值的数组
     * [toValueArray 得到链表值的数组]
     * @return {[type]} [description]
     */
    toValueArray() {
        const values = [];
        let currentNode = this.head;
        // let currentValue = this.head.value
        while (currentNode) {
            values.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return values;
    }
}

const Configs = {
    film: 'G:\\Feature film',
    store: 'G:\\test'
};

/**
 * 调用opencv读取视频第一帧并保存成文件
 * @param film 视频文件路径
 * @param ThumbnailPath 保存帧文件路径
 */
function generateimg(film, filename, ThumbnailPath, times) {
    // "" 来去除文件名带有空格等其它情况
    let run = `E:\\python\\python3.8.1\\python.exe  .\\src\\render\\python\\picture.py "${film}" "${JSON.stringify(filename).replace(/\"/g, '\'')}" "${ThumbnailPath}"`;
    // console.log(run);
    // let python = child_pross.exec(run,{encoding:'utf-8'})
    let python = child_pross__default['default'].exec(run, { encoding: "buffer" });
    const decoder = new TextDecoder('gbk');
    python.stdout.on('data', function (data) {
        console.log(decoder.decode(data));
        if (decoder.decode(data).length === times) {
            // console.log(decoder.decode(data));
            electron.ipcRenderer.send('ipc:message', fmtpath(filename, Configs));
        }
    });
    python.stderr.on('data', function (data) {
        console.log(decoder.decode(data));
    });
    python.on('close', function (code) {
        if (code !== 0) { //0 为执行成功
            console.log(code);
        }
    });
}
function fmtpath(LinkedList, Config) {
    return LinkedList.map((n) => {
        let img = Object.create(null);
        img.file = path__default['default'].basename(n);
        img.lable = n.replace(Config.film, "").replace(img.file, "");
        // img.file=img.file.replace(/\.(mp4|mkv)/,'.jpg')
        return img;
    });
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let File = new Files();
let LinkedLists = new LinkedList();
let Proxy_Files = new Proxy(File, {
    set: function (target, propKey, value, receiver) {
        if (propKey === 'times') {
            let filename = LinkedLists.toValueArray().flat();
            generateimg(Configs.film, filename, Configs.store, filename.length);
        }
        return Reflect.set(target, propKey, value, receiver);
    }
});
let gen = Proxy_Files.FileTree(1, Configs.film, LinkedLists);
gen.next();
electron.ipcRenderer.on('ipc:message', (event, ...arg) => {
    console.log('arg', arg);
    gen.next();
});
// let op:chokidar.WatchOptions = {}
// const watcher =  chokidar.watch(Configs.film,{
//   ignored:/\.(^mp4|^mkv)/,
//   persistent:true,
//   depth:1
// }) 
// watcher
// .on('add',path=>console.log(path))
// .on('addDir',path=>console.log(path))
// .on('unlink',path=>console.log(path))
// .on('unlinkDir',path=>console.log(path))
//# sourceMappingURL=main.js.map
