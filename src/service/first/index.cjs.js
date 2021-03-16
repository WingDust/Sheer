"use strict";
var fs = require("fs");
var path = require("path");
var util = require("util");
var events = require("events");
var os = require("os");
var electron = require("electron");
var child_pross = require("child_process");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : {default: e};
}
var fs__default = /* @__PURE__ */ _interopDefaultLegacy(fs);
var path__default = /* @__PURE__ */ _interopDefaultLegacy(path);
var util__default = /* @__PURE__ */ _interopDefaultLegacy(util);
var events__default = /* @__PURE__ */ _interopDefaultLegacy(events);
var os__default = /* @__PURE__ */ _interopDefaultLegacy(os);
var child_pross__default = /* @__PURE__ */ _interopDefaultLegacy(child_pross);
function matchObject(item, str) {
  return Object.prototype.toString.call(item) === "[object " + str + "]";
}
function checkStat(name, fn) {
  try {
    return fn(name);
  } catch (err) {
    if (/^(ENOENT|EPERM|EACCES)$/.test(err.code)) {
      if (err.code !== "ENOENT") {
        console.warn("Warning: Cannot access %s", name);
      }
      return false;
    }
    throw err;
  }
}
var is = {
  nil: function(item) {
    return item == null;
  },
  array: function(item) {
    return Array.isArray(item);
  },
  emptyObject: function(item) {
    for (var key in item) {
      return false;
    }
    return true;
  },
  buffer: function(item) {
    return Buffer.isBuffer(item);
  },
  regExp: function(item) {
    return matchObject(item, "RegExp");
  },
  string: function(item) {
    return matchObject(item, "String");
  },
  func: function(item) {
    return typeof item === "function";
  },
  number: function(item) {
    return matchObject(item, "Number");
  },
  exists: function(name) {
    return fs__default["default"].existsSync(name);
  },
  file: function(name) {
    return checkStat(name, function(n) {
      return fs__default["default"].statSync(n).isFile();
    });
  },
  samePath: function(a, b) {
    return path__default["default"].resolve(a) === path__default["default"].resolve(b);
  },
  directory: function(name) {
    return checkStat(name, function(n) {
      return fs__default["default"].statSync(n).isDirectory();
    });
  },
  symbolicLink: function(name) {
    return checkStat(name, function(n) {
      return fs__default["default"].lstatSync(n).isSymbolicLink();
    });
  },
  windows: function() {
    return os__default["default"].platform() === "win32";
  }
};
var is_1 = is;
var IS_SUPPORT;
var TEMP_DIR = os__default["default"].tmpdir && os__default["default"].tmpdir() || {}.TMPDIR || {}.TEMP || process.cwd();
function TempStack() {
  this.stack = [];
}
TempStack.prototype = {
  create: function(type, base) {
    var name = path__default["default"].join(base, "node-watch-" + Math.random().toString(16).substr(2));
    this.stack.push({name, type});
    return name;
  },
  write: function() {
    for (var i = 0; i < arguments.length; ++i) {
      fs__default["default"].writeFileSync(arguments[i], " ");
    }
  },
  mkdir: function() {
    for (var i = 0; i < arguments.length; ++i) {
      fs__default["default"].mkdirSync(arguments[i]);
    }
  },
  cleanup: function(fn) {
    try {
      var temp;
      while (temp = this.stack.pop()) {
        var type = temp.type;
        var name = temp.name;
        if (type === "file" && is_1.file(name)) {
          fs__default["default"].unlinkSync(name);
        } else if (type === "dir" && is_1.directory(name)) {
          fs__default["default"].rmdirSync(name);
        }
      }
    } finally {
      if (is_1.func(fn))
        fn();
    }
  }
};
var pending = false;
var hasNativeRecursive = function hasNativeRecursive2(fn) {
  if (!is_1.func(fn)) {
    return false;
  }
  if (IS_SUPPORT !== void 0) {
    return fn(IS_SUPPORT);
  }
  if (!pending) {
    pending = true;
  } else {
    return setTimeout(function() {
      hasNativeRecursive2(fn);
    }, 300);
  }
  var stack = new TempStack();
  var parent = stack.create("dir", TEMP_DIR);
  var child = stack.create("dir", parent);
  var file = stack.create("file", child);
  stack.mkdir(parent, child);
  var options = {recursive: true};
  var watcher;
  try {
    watcher = fs__default["default"].watch(parent, options);
  } catch (e) {
    if (e.code == "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM") {
      return fn(IS_SUPPORT = false);
    } else {
      throw e;
    }
  }
  if (!watcher) {
    return false;
  }
  var timer = setTimeout(function() {
    watcher.close();
    stack.cleanup(function() {
      fn(IS_SUPPORT = false);
    });
  }, 200);
  watcher.on("change", function(evt, name) {
    if (path__default["default"].basename(file) === path__default["default"].basename(name)) {
      watcher.close();
      clearTimeout(timer);
      stack.cleanup(function() {
        fn(IS_SUPPORT = true);
      });
    }
  });
  stack.write(file);
};
var EVENT_UPDATE = "update";
var EVENT_REMOVE = "remove";
var SKIP_FLAG = Symbol("skip");
function hasDup(arr) {
  return arr.some(function(v, i, self) {
    return self.indexOf(v) !== i;
  });
}
function unique(arr) {
  return arr.filter(function(v, i, self) {
    return self.indexOf(v) === i;
  });
}
function flat1(arr) {
  return arr.reduce(function(acc, v) {
    return acc.concat(v);
  }, []);
}
function assertEncoding(encoding) {
  if (encoding && encoding !== "buffer" && !Buffer.isEncoding(encoding)) {
    throw new Error("Unknown encoding: " + encoding);
  }
}
function guard(fn) {
  return function(arg, action) {
    if (is_1.func(fn)) {
      var ret = fn(arg, SKIP_FLAG);
      if (ret && ret !== SKIP_FLAG)
        action();
    } else if (is_1.regExp(fn)) {
      if (fn.test(arg))
        action();
    } else {
      action();
    }
  };
}
function composeMessage(names) {
  return names.map(function(n) {
    return is_1.exists(n) ? [EVENT_UPDATE, n] : [EVENT_REMOVE, n];
  });
}
function getMessages(cache) {
  var filtered = unique(cache);
  var reg = /~$|^\.#|^##$/g;
  var hasSpecialChar = cache.some(function(c) {
    return reg.test(c);
  });
  if (hasSpecialChar) {
    var dup = hasDup(cache.map(function(c) {
      return c.replace(reg, "");
    }));
    if (dup) {
      filtered = filtered.filter(function(m) {
        return is_1.exists(m);
      });
    }
  }
  return composeMessage(filtered);
}
function debounce(info, fn) {
  var timer, cache = [];
  var encoding = info.options.encoding;
  var delay = info.options.delay;
  if (!is_1.number(delay)) {
    delay = 200;
  }
  function handle() {
    getMessages(cache).forEach(function(msg) {
      msg[1] = Buffer.from(msg[1]);
      if (encoding !== "buffer") {
        msg[1] = msg[1].toString(encoding);
      }
      fn.apply(null, msg);
    });
    timer = null;
    cache = [];
  }
  return function(rawEvt, name) {
    cache.push(name);
    if (!timer) {
      timer = setTimeout(handle, delay);
    }
  };
}
function createDupsFilter() {
  var memo = {};
  return function(fn) {
    return function(evt, name) {
      memo[evt + name] = [evt, name];
      setTimeout(function() {
        Object.keys(memo).forEach(function(n) {
          fn.apply(null, memo[n]);
        });
        memo = {};
      });
    };
  };
}
function getSubDirectories(dir, fn, done = function() {
}) {
  if (is_1.directory(dir)) {
    fs__default["default"].readdir(dir, function(err, all) {
      if (err) {
        if (/^(EPERM|EACCES)$/.test(err.code)) {
          console.warn("Warning: Cannot access %s.", dir);
        } else {
          throw err;
        }
      } else {
        all.forEach(function(f) {
          var sdir = path__default["default"].join(dir, f);
          if (is_1.directory(sdir))
            fn(sdir);
        });
        done();
      }
    });
  } else {
    done();
  }
}
function semaphore(final) {
  var counter = 0;
  return function start() {
    counter++;
    return function stop() {
      counter--;
      if (counter === 0)
        final();
    };
  };
}
function nullCounter() {
  return function nullStop() {
  };
}
function shouldNotSkip(filePath, filter) {
  return !is_1.func(filter) || filter(filePath, SKIP_FLAG) !== SKIP_FLAG;
}
var deprecationWarning = util__default["default"].deprecate(function() {
}, "(node-watch) First param in callback function  is replaced with event name since 0.5.0, use  `(evt, filename) => {}` if you want to get the filename");
function Watcher() {
  events__default["default"].EventEmitter.call(this);
  this.watchers = {};
  this._isReady = false;
  this._isClosed = false;
}
util__default["default"].inherits(Watcher, events__default["default"].EventEmitter);
Watcher.prototype.expose = function() {
  var expose = {};
  var self = this;
  var methods = [
    "on",
    "emit",
    "once",
    "close",
    "isClosed",
    "listeners",
    "setMaxListeners",
    "getMaxListeners",
    "getWatchedPaths"
  ];
  methods.forEach(function(name) {
    expose[name] = function() {
      return self[name].apply(self, arguments);
    };
  });
  return expose;
};
Watcher.prototype.isClosed = function() {
  return this._isClosed;
};
Watcher.prototype.close = function(fullPath) {
  var self = this;
  if (fullPath) {
    var watcher = this.watchers[fullPath];
    if (watcher && watcher.close) {
      watcher.close();
      delete self.watchers[fullPath];
    }
    getSubDirectories(fullPath, function(fpath) {
      self.close(fpath);
    });
  } else {
    Object.keys(self.watchers).forEach(function(fpath) {
      var watcher2 = self.watchers[fpath];
      if (watcher2 && watcher2.close) {
        watcher2.close();
      }
    });
    this.watchers = {};
  }
  if (is_1.emptyObject(self.watchers)) {
    if (!this._isClosed) {
      this._isClosed = true;
      process.nextTick(emitClose, this);
    }
  }
};
Watcher.prototype.getWatchedPaths = function(fn) {
  if (is_1.func(fn)) {
    var self = this;
    if (self._isReady) {
      fn(Object.keys(self.watchers));
    } else {
      self.on("ready", function() {
        fn(Object.keys(self.watchers));
      });
    }
  }
};
function emitReady(self) {
  if (!self._isReady) {
    self._isReady = true;
    process.nextTick(function() {
      self.emit("ready");
    });
  }
}
function emitClose(self) {
  self.emit("close");
}
Watcher.prototype.add = function(watcher, info) {
  var self = this;
  info = info || {fpath: ""};
  var watcherPath = path__default["default"].resolve(info.fpath);
  this.watchers[watcherPath] = watcher;
  var internalOnChange = function(rawEvt, rawName) {
    if (self.isClosed()) {
      return;
    }
    var name = rawName;
    if (is_1.nil(name)) {
      name = "";
    }
    name = path__default["default"].join(info.fpath, name);
    if (info.options.recursive) {
      hasNativeRecursive(function(has) {
        if (!has) {
          var fullPath = path__default["default"].resolve(name);
          if (!is_1.exists(name)) {
            self.close(fullPath);
          } else {
            var shouldWatch = is_1.directory(name) && !self.watchers[fullPath] && shouldNotSkip(name, info.options.filter);
            if (shouldWatch) {
              self.watchDirectory(name, info.options);
            }
          }
        }
      });
    }
    handlePublicEvents(rawEvt, name);
  };
  var handlePublicEvents = debounce(info, function(evt, name) {
    if (info.compareName) {
      if (info.compareName(name)) {
        self.emit("change", evt, name);
      }
    } else {
      var filterGuard = guard(info.options.filter);
      filterGuard(name, function() {
        if (self.flag)
          self.flag = "";
        else
          self.emit("change", evt, name);
      });
    }
  });
  watcher.on("error", function(err) {
    if (self.isClosed()) {
      return;
    }
    if (is_1.windows() && err.code === "EPERM") {
      watcher.emit("change", EVENT_REMOVE, info.fpath && "");
      self.flag = "windows-error";
      self.close(watcherPath);
    } else {
      self.emit("error", err);
    }
  });
  watcher.on("change", internalOnChange);
};
Watcher.prototype.watchFile = function(file, options, fn) {
  var parent = path__default["default"].join(file, "../");
  var opts = Object.assign({}, options, {
    filter: null,
    encoding: "utf8"
  });
  delete opts.recursive;
  var watcher = fs__default["default"].watch(parent, opts);
  this.add(watcher, {
    type: "file",
    fpath: parent,
    options: Object.assign({}, opts, {
      encoding: options.encoding
    }),
    compareName: function(n) {
      return is_1.samePath(n, file);
    }
  });
  if (is_1.func(fn)) {
    if (fn.length === 1)
      deprecationWarning();
    this.on("change", fn);
  }
};
Watcher.prototype.watchDirectory = function(dir, options, fn, counter = nullCounter) {
  var self = this;
  var done = counter();
  hasNativeRecursive(function(has) {
    options.recursive = !!options.recursive;
    var opts = Object.assign({}, options, {
      encoding: "utf8"
    });
    if (!has) {
      delete opts.recursive;
    }
    if (self._isClosed) {
      done();
      return self.close();
    }
    var watcher = fs__default["default"].watch(dir, opts);
    self.add(watcher, {
      type: "dir",
      fpath: dir,
      options
    });
    if (is_1.func(fn)) {
      if (fn.length === 1)
        deprecationWarning();
      self.on("change", fn);
    }
    if (options.recursive && !has) {
      getSubDirectories(dir, function(d) {
        if (shouldNotSkip(d, options.filter)) {
          self.watchDirectory(d, options, null, counter);
        }
      }, counter());
    }
    done();
  });
};
function composeWatcher(watchers) {
  var watcher = new Watcher();
  var filterDups = createDupsFilter();
  var counter = watchers.length;
  watchers.forEach(function(w) {
    w.on("change", filterDups(function(evt, name) {
      watcher.emit("change", evt, name);
    }));
    w.on("error", function(err) {
      watcher.emit("error", err);
    });
    w.on("ready", function() {
      if (!--counter) {
        emitReady(watcher);
      }
    });
  });
  watcher.close = function() {
    watchers.forEach(function(w) {
      w.close();
    });
    process.nextTick(emitClose, watcher);
  };
  watcher.getWatchedPaths = function(fn) {
    if (is_1.func(fn)) {
      var promises = watchers.map(function(w) {
        return new Promise(function(resolve) {
          w.getWatchedPaths(resolve);
        });
      });
      Promise.all(promises).then(function(result) {
        var ret = unique(flat1(result));
        fn(ret);
      });
    }
  };
  return watcher.expose();
}
function watch(fpath, options, fn) {
  var watcher = new Watcher();
  if (is_1.buffer(fpath)) {
    fpath = fpath.toString();
  }
  if (!is_1.array(fpath) && !is_1.exists(fpath)) {
    watcher.emit("error", new Error(fpath + " does not exist."));
  }
  if (is_1.string(options)) {
    options = {
      encoding: options
    };
  }
  if (is_1.func(options)) {
    fn = options;
    options = {};
  }
  if (arguments.length < 2) {
    options = {};
  }
  if (options.encoding) {
    assertEncoding(options.encoding);
  } else {
    options.encoding = "utf8";
  }
  if (is_1.array(fpath)) {
    if (fpath.length === 1) {
      return watch(fpath[0], options, fn);
    }
    var filterDups = createDupsFilter();
    return composeWatcher(unique(fpath).map(function(f) {
      var w = watch(f, options);
      if (is_1.func(fn)) {
        w.on("change", filterDups(fn));
      }
      return w;
    }));
  }
  if (is_1.file(fpath)) {
    watcher.watchFile(fpath, options, fn);
    emitReady(watcher);
  } else if (is_1.directory(fpath)) {
    var counter = semaphore(function() {
      emitReady(watcher);
    });
    watcher.watchDirectory(fpath, options, fn, counter);
  }
  return watcher.expose();
}
var watch_1 = watch;
var _default = watch;
watch_1.default = _default;
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
let File = new Files();
let LinkedLists = new LinkedList();
let Proxy_Files = new Proxy(File, {
  set: function(target, propKey, value, receiver) {
    if (propKey === "times") {
      let filename = LinkedLists.toValueArray().flat();
      generateimg(Configs.film, filename, Configs.store, filename.length);
    }
    return Reflect.set(target, propKey, value, receiver);
  }
});
let gen = Proxy_Files.FileTree(1, Configs.film, LinkedLists);
gen.next();
electron.ipcRenderer.on("ipc:message", (event, ...arg) => {
  console.log("arg", arg);
  gen.next();
});
watch_1(Configs.film, {
  recursive: false
}, (e, n) => {
  console.log(e);
  console.log(n);
});
