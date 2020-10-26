## Base on
  - [Electron + vue3 + vite 整合](https:www.jianshu.com/p/ee5ec23d4716)

## Mentality
  - 开始写入：2020年10月27日 星期二 00:21:26
  1. 对现在的两个模式：秩序与混沌，这个我实现的显示层面的最终状态
  2. 对于秩序中我对数量的要求并不是那么强烈，虽说我的那个，但是我可能会去实现一个条形图
  3. 之前我在想的有一个紧凑形的视图设计，但是我在对这个设计的目的有些迷失了，我得先想出这要这样的设计，是否符合我原思想中直观性。
  4. 之前我想主要是由混沌转向秩序，但我对混沌也得做一个分层，也要有一个原本就是处于乱的情况下，再转向稍有点秩序的局面。
  - 最后修改：2020年10月27日 星期二 00:30:09



## Subproject
  - Rust-Wasm
  - C/C++ - Emscripten
  - golang

## Attention
  - 抽离出来的东西
  - 怎么样的组织代码
  - 将图片的宽高改成 256 × 144 (128 × 72 的两倍) 
    - 这样我好维护，并更容易地控制每一行一个元素的大小

## TypeScript
  - `global.d.ts` 当文件中出现 `import` 语句时它将不会是全局作用域，`declare` 也将无效 ，需要重新在 `declare gloabl{...}` 中写不再需要写 `declare` 直接定义
    - Node 全局对象 `global` 上的挂载
    ```ts
    declare global{
      module NodeJS {
          interface Global {
          }
      }
    ```
    - Browser 全局对象 `window` 上的挂载
    ```ts
    declare global{
      module NodeJS {
       interface Window {
       }
      }
    ```

## Python
  - [ ] 将 picture.py 或 TypeScript 中的文件添加检查帧是否重复写入


## Rust
  - 对于 Rust-wasm 使用在哪里的问题
    > 暂时尝试替换hotkey包

## DataStructure
  - [ ] Tree.js 的功能增强

## Try
  - AssemblyScript 的试验
  - 可选从网络加载图片

## TODO
  - 设计整体完善
  - 使用滚动到视口窗口中之内 
    - 解决方案
      - 使用 Element.scrollBy 来实现固定滚动距离
  - [ ] 将 Prism Vue 组件分离出去
  - [ ] 对 File 加一个函数节流，限制它的运行次数 预定次数 为 60 次
  - [x] 数据获取响应成功
  - [ ] 处理 js-yaml 函数返回值问题

## IDEA
  - [ ] 对 File 类中能一层的分块，进行一个探索
  - [ ] 对背景做一个滑动过线性东西的动画尝试


## Mode
  - 混沌模式
  - 秩序模式
  - 紧凑模式

## For 、Inspiration
  - [qutebrowser](https:  qutebrowser.org/)
  - [vimstart](https:  github.com/okitavera/vimstart)








## Reference
  - VSCode 方向
    - 搜索关键词：Monaco源码分析
    - [VSCode技术揭秘（一）](https://segmentfault.com/a/1190000020833042?utm_source=tag-newest)
    - [monaco-editor实现全局内容和文件搜索](https://blog.csdn.net/weixin_42084197/article/details/90486243)
    - [VsCode源码分析之布局](https://www.cnblogs.com/youcong/p/10295335.html)
    - [monaco editor各种功能实现总结](https://blog.csdn.net/gao_grace/article/details/88890895)
    - [Monaco Editor使用](https://tangpengfei111.github.io/2019/12/21/monaco-editor%E4%BD%BF%E7%94%A8/)
    - [Editor源码阅读](http://gwiki.cn/2018/01/editor%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB)
  - Vue 方向
    - [Vue中文件社区]https://www.vue-js.com/)
  - 前端 方向
    - 