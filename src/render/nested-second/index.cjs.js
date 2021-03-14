"use strict";
var electron = require("electron");
var fs = require("fs");
var path = require("path");
var child_pross = require("child_process");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : {default: e};
}
var fs__default = /* @__PURE__ */ _interopDefaultLegacy(fs);
var path__default = /* @__PURE__ */ _interopDefaultLegacy(path);
var child_pross__default = /* @__PURE__ */ _interopDefaultLegacy(child_pross);
class Files {
  constructor() {
    this.addTimes = 0;
    this.addTimes1 = 0;
    this.times = 0;
  }
  static renamefile(oldName, newName) {
    return new Promise((resolve) => {
      fs__default["default"].rename(oldName, newName, (e) => {
        if (e)
          throw e;
      });
      resolve("suc");
    });
  }
  static fsReadDir(dir) {
    return new Promise((resolve, reject) => {
      fs__default["default"].readdir(dir, {withFileTypes: true}, (err, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
  }
  async *FileTree(level, dirPath, LinkedList2) {
    switch (level) {
      case 1: {
        let firstlayer = [];
        let paths = await Files.fsReadDir(dirPath);
        paths.sort(Files.compareFiles);
        let len = 0;
        while (++len < paths.length) {
          if (paths[len].isFile() && Files.getFileType(paths[len].name)) {
            firstlayer.push(path__default["default"].join(dirPath, paths[len].name));
            this.addTimes1++;
            if (this.addTimes1 > 6) {
              this.addTimes1 = 0;
              LinkedList2.append(firstlayer);
              this.times++;
              yield;
              firstlayer = [];
            }
          }
        }
        if (firstlayer.length != 0) {
          LinkedList2.append(firstlayer);
          firstlayer = [];
          this.times++;
        }
        break;
      }
      case 2: {
        let secondlayer = [];
        let paths = await Files.fsReadDir(dirPath);
        paths.sort(Files.compareFiles);
        paths.reverse();
        let len = paths.length;
        while (len--) {
          if (paths[len].isDirectory()) {
            let abspath = path__default["default"].join(dirPath, paths[len].name);
            let path2s = await Files.fsReadDir(abspath);
            path2s.sort(Files.compareFiles);
            path2s.reverse();
            let len2 = path2s.length;
            while (len2--) {
              const abspath2 = path__default["default"].join(abspath, path2s[len2].name);
              if (path2s[len2].isFile() && Files.getFileType(path2s[len2].name)) {
                secondlayer.push(abspath2);
                if (this.addTimes > 30) {
                  this.addTimes = 0;
                  LinkedList2.append(secondlayer);
                  this.times++;
                  yield;
                  secondlayer = [];
                }
                this.addTimes++;
              }
            }
            if (secondlayer.length != 0) {
              LinkedList2.append(secondlayer);
              secondlayer = [];
            }
          }
        }
        if (secondlayer.length != 0) {
          LinkedList2.append(secondlayer);
          secondlayer = [];
          this.times++;
        }
        break;
      }
    }
  }
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
      "ts"
    ];
    return RegExp(".(" + videosuffix.join("|") + ")$", "i").test(name.toLowerCase()) ? true : false;
  }
  static compareFiles(a, b) {
    const LetterPrefixRegex = /[a-z]+/i;
    if (typeof a === "string" && typeof b === "string") {
      return Number(LetterPrefixRegex.test(a)) && !Number(LetterPrefixRegex.test(b)) ? 1 : !LetterPrefixRegex.test(a) && Number(LetterPrefixRegex.test(b)) ? -1 : a.localeCompare(b, "zh");
    } else if ("filename" in a && "filename" in b) {
      return Number(LetterPrefixRegex.test(a.filename)) && !Number(LetterPrefixRegex.test(b.filename)) ? 1 : !LetterPrefixRegex.test(a.filename) && Number(LetterPrefixRegex.test(b.filename)) ? -1 : a.filename.localeCompare(b.filename, "zh");
    } else {
      return Number(b.isDirectory()) - Number(a.isDirectory()) && (Number(LetterPrefixRegex.test(a.name)) && !Number(LetterPrefixRegex.test(b.name))) ? 1 : !LetterPrefixRegex.test(a.name) && Number(LetterPrefixRegex.test(b.name)) ? -1 : a.name.localeCompare(b.name, "zh");
    }
  }
}
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
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
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }
  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deleteNode = this.head;
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return deleteNode;
  }
  deleteTail() {
    const deleteTail = this.tail;
    if (!this.head) {
      return null;
    }
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
      return deleteTail;
    }
    let currentNode = this.head;
    while (currentNode.next.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = null;
    this.tail = currentNode;
    this.length--;
    return deleteTail;
  }
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
        if (currentNode.next.value === value) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    this.tail = currentNode;
    return deleteNode;
  }
  deleteAt(index) {
    if (!this.head) {
      return this;
    }
    if (index < 0 || index > this.length) {
      return "\u7D22\u5F15\u8D85\u51FA";
    }
    if (index === 0) {
      let deleteNode = this.head;
      this.deleteHead();
      return deleteNode;
    }
    if (index === this.length - 1) {
      let deleteNode = this.tail;
      this.deleteTail();
      return deleteNode;
    }
    if (this.length === 3) {
      let deleteNode = this.head.next;
      this.head.next = this.tail;
      this.length--;
      return deleteNode;
    }
    let currentNode = this.head.next;
    let amounts = 0;
    while (currentNode) {
      if (index - 1 == amounts) {
        currentNode.next = currentNode.next.next;
        this.length--;
        return currentNode.next;
      }
      amounts++;
      currentNode = currentNode.next;
    }
  }
  reverse() {
    let curNode = this.head;
    let prevNode = null;
    let nextNode = null;
    while (curNode) {
      nextNode = curNode.next;
      curNode.next = prevNode;
      prevNode = curNode;
      curNode = nextNode;
    }
    this.tail = this.head;
    this.head = prevNode;
    return this;
  }
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  fromArray(values) {
    values.forEach((value) => this.append(value));
    this.length = values.length;
    return this;
  }
  toValueArray() {
    const values = [];
    let currentNode = this.head;
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return values;
  }
}
const Configs = {
  film: "G:\\Feature film",
  store: "G:\\test"
};
function generateimg(film, filename, ThumbnailPath, times) {
  let run = `E:\\python\\python3.8.1\\python.exe  .\\src\\render\\python\\picture.py "${film}" "${JSON.stringify(filename).replace(/\"/g, "'")}" "${ThumbnailPath}"`;
  let python = child_pross__default["default"].exec(run, {encoding: "buffer"});
  const decoder = new TextDecoder("gbk");
  python.stdout.on("data", function(data) {
    console.log(decoder.decode(data));
    if (decoder.decode(data).length === times) {
      electron.ipcRenderer.send("ipc:message", fmtpath(filename, Configs));
    }
  });
  python.stderr.on("data", function(data) {
    console.log(decoder.decode(data));
  });
  python.on("close", function(code) {
    if (code !== 0) {
      console.log(code);
    }
  });
}
function fmtpath(LinkedList2, Config2) {
  return LinkedList2.map((n) => {
    let img = Object.create(null);
    img.file = path__default["default"].basename(n);
    img.lable = n.replace(Config2.film, "").replace(img.file, "");
    return img;
  });
}
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
console.log(process.pid);
let File = new Files();
let LinkedLists = new LinkedList();
let Proxy_Files = new Proxy(File, {
  set: function(target, propKey, value, receiver) {
    if (propKey === "times") {
      console.log(LinkedLists.toValueArray());
      let filename = LinkedLists.toValueArray().flat();
      generateimg(Configs.film, filename, Configs.store, filename.length);
    }
    return Reflect.set(target, propKey, value, receiver);
  }
});
let gen = Proxy_Files.FileTree(2, Configs.film, LinkedLists);
gen.next();
electron.ipcRenderer.on("ipc:message", (event, ...arg) => {
  console.log("arg:", arg);
  gen.next();
});
