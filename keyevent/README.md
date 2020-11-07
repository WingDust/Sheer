<!--
 * @Author: your name
 * @Date: 2020-10-20 14:15:31
 * @LastEditTime: 2020-11-07 11:20:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\keyevent\README.md
-->
## Rust Wasm 编译
  - ` $ wasm-pack build --target web`
## wasm 在 Chrome 中使用的问题
  - 开始写入：2020年10月20日 星期二 16:20:50
    - Electron version : 9.1.0
    - `Content-Security-Policy` 在 Chrome 中使用 wasm 会导致
      - Rerference
        - [WebAssembly Content Security Policy](https://github.com/WebAssembly/content-security-policy/blob/a29b53ef2baa7fad1ea30d6270b8095043f277ae/proposals/CSP.md)
        - [Cannot use ELECTRON_ENABLE_SECURITY_WARNINGS and load WASM](https://github.com/electron/electron/issues/23252)
      - 解决方案
      ```html
    <!--<meta http-equiv="Content-Security-Policy" content="script-src 'self';">-->
        ```
    - 好像在新 Version 的 Electron 被 fixed 了 [fix: wasm code generation in the renderer](https://github.com/electron/electron/pull/25777)

  - 最后修改： 2020年10月21日 星期三 12:43:29