## C/C++ 编译 Webassembly 经历
  > 2020年09月14日 星期一 07:02:36
  - 首先我原想实现在 Electron 中调用 wasm 编写的函数，以函数式编程思想来写
    - 以一个实现传入路径字符串，返回判断路径是否存在的函数
  - C++ 源码在 `run.cpp`
    - 其中在写 C++ 中遇到的问题
    1. 在 linux 中要引入 Windows 头文件的处理 
      - "io.h"下的`_access()` 与 "unistd.h" 下`access()`
      ```C++
      #ifdef _WIN64 // 有 _WIN32区别
      #include <io.h>
      #else
      #include <unistd.h>
      #endif

      #ifdef _WIN64 
        //_access()
      #else
        //access()
      #endif
      ```
  - C++ 可供扩展
    - Relate
      - [linux, windows, mac, ios等平台GCC预编译宏判断](https://www.jianshu.com/p/c92e8b81ad04)
      - [C++ 如何跨平台判断操作系统是32位还是64位？](https://www.zhihu.com/question/58377556)

  - 在 Arch Linux 上使用 Emscripten 编译 （下次可在 WSL Arch 上使用）
  - 编译命令 `$ em++ run.cpp -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -o run.js `
  - Node 测试代码
  ```js
  var em_module = require('./run.js');
  em_module['onRuntimeInitialized'] = onRuntimeInitialized;

  //console.log(em_module.run());
  //em_module._hi('qweqwe');

  // 需要等页面加载后再使用
  // [“Assertion failed: you need to wait for the runtime to be ready” Error when calling a C function in JavaScript](https://stackoverflow.com/questions/46332158/assertion-failed-you-need-to-wait-for-the-runtime-to-be-ready-error-when-call)
  function onRuntimeInitialized(){
      var s = '/home/wingdust/Programming/Emcc/for.txt';
      let a = em_module.ccall('hi','number',['string'],[s])
  console.log(a)
  }
  ```
  > Linux 测试成功返回 `1`
  - Relate Issue
    - [emscripten-core/emscripten#12186](https://github.com/emscripten-core/emscripten/issues/12186)
### Reference
  - [3dgen/cppwasm-book](https://github.com/3dgen/cppwasm-book)
    - [C/C++面向WebAssembly编程](https://www.cntofu.com/book/150/index.html)
    - 对其中的 FileSystem API 并未做出尝试
  - 


## Electron + Typescript + Vite 使用 wasm 问题
  > 2020年09月14日 星期一 07:02:36
  测试代码
  ```ts
  import "run/run.wasm"
// console.log(read_file);
/// <reference types="emscripten"/>
// let em_moudle = require("run")



// // /// <reference types="emscripten"/>
// // // const em_moudle = require("run")
// em_moudle['onRuntimeInitialized'] = onRuntimeInitialized

// function  onRuntimeInitialized() {
//   let a = '../assets/electron.png'
//   let b = em_moudle.ccall('hi','number',['string'],[a])
//   console.log(b);
// }
  ```
  - 一个是 C++ 编译的 Webassembly 没有 TypeScript 声明文件，需要自己定义，可参考 [How to use TypeScript declarations for Emscripten](https://github.com/emscripten-core/emscripten/issues/10271)，这次的 run.d.ts 也是。
  在  `let em_moudle = require("run")` 和 `let em_moudle = require("../cplusplus/run")` 中会 occur 
  `Can't find module "run" or "../cplusplus/run"` 的错，
  试过 Rust Webassembly 的本地依赖，也无用。
  最后自己将这个改成一个 node 本地包，添加 `"main":"run.js"` 的 `package.json` 放到 `node_module` 文件夹中 
  `run.js` 中添加 `module.export = Module` 
  运行时会有读取本地文件的安全警告 Error 可通过在主进程中添加 `webSecurity:false` 来解决（这个方法不被推荐）
  但是还是会有 `run.js` 使用 Fetch 来抓取本地文件的 Error
