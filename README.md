## Base on
  - [Electron + vue3 + vite 整合](https:  www.jianshu.com/p/ee5ec23d4716)

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

## DataStructure
  - [ ] Tree.js 的功能增强

## Try
  - AssemblyScript 的试验
  - 可选从网络加载图片

## TODO
  - [ ] 将 Prism Vue 组件分离出去
  - [ ] 对 File 加一个函数节流，限制它的运行次数 预定次数 为 60 次
  - [x] 数据获取响应成功
  - [ ] 处理 js-yaml 函数返回值问题

## IDEA
  - [ ] 对 File 类中能一层的分块，进行一个探索
  - [ ] 对背景做一个滑动过线性东西的动画尝试

## Reference、Inspiration
  - [qutebrowser](https:  qutebrowser.org/)
  - [vimstart](https:  github.com/okitavera/vimstart)



