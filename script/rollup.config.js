/*
 * @Author: your name
 * @Date: 2020-08-21 21:03:28
 * @LastEditTime: 2021-02-18 09:29:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\script\rollup.config.js
 */
const path = require('path');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');

module.exports = (env = 'production') => {
  return [{
    input: path.join(__dirname, '../src/main/index.ts'),
    output: {
      file: path.join(__dirname, '../src/main/_.js'),
      format: 'cjs',
      name: 'ElectronMainBundle',
      sourcemap: true,
    }, // [如果要输出多个，可以是一个数组，如果是数组，Rollup 会把每一个数组元素当成一个配置输出结果](http://www.sosout.com/2018/08/04/rollup-tutorial.html)
    plugins: [
      nodeResolve({ jsnext: true, preferBuiltins: true, browser: true }), // 消除碰到 node.js 模块时⚠警告
      commonjs(),
      typescript(),
    ],
    external: [
      'fs',
      'path',
      'http',
      'https',
      'child_process',
      'os',
      'electron',
    ],
  },
  {
    input:path.join(__dirname, '../src/render/nested-first/server/main.ts'),
    output:{
      file: path.join(__dirname, '../src/render/nested-first/server/main.js'),
      format: 'cjs',
      name: 'ElectronServer',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ jsnext: true, preferBuiltins: true, browser: true }), // 消除碰到 node.js 模块时⚠警告
      commonjs(),
      typescript(),
    ],
    external: [
      'fs',
      'path',
      'http',
      'https',
      'child_process',
      'os',
      'electron',
    ],
  },
  {
    input:path.join(__dirname, '../src/render/nested-second/server/main.ts'),
    output:{
      file: path.join(__dirname, '../src/render/nested-second/server/main.js'),
      format: 'cjs',
      name: 'ElectronServer',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ jsnext: true, preferBuiltins: true, browser: true }), // 消除碰到 node.js 模块时⚠警告
      commonjs(),
      typescript(),
    ],
    external: [
      'fs',
      'path',
      'http',
      'https',
      'child_process',
      'os',
      'electron',
    ],
  }
]
};
