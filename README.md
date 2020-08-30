## Base on
  - [Electron + vue3 + vite 整合](https://www.jianshu.com/p/ee5ec23d4716)


## TODO
  - [ ] 将 Prism Vue 组件分离出去
  - [ ] 对 File 加一个函数节流，限制它的运行次数 预定次数 为 60 次

## IDEA
  - [ ] 对 File 类中能一层的分块，进行一个探索
  ```mermaid
flowchart LR
    1[(film.yml)] <--> 2[(树)]
    1 --> 3{flag}
    3 -->|包装| Proxy对象
  ```

## Reference、Inspiration
  - [qutebrowser](https://qutebrowser.org/)
  - [vimstart](https://github.com/okitavera/vimstart)


## Rust
  - 对于 Rust-wasm 使用在哪里的问题

