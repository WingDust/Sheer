const path = require('path');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const builtins = require('rollup-plugin-node-builtins')
const gloabls = require('rollup-plugin-node-globals')

// @ts-ignore
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
      nodeResolve({ preferBuiltins: true, browser: true }), // 消除碰到 node.js 模块时⚠警告
      // @ts-ignore
      commonjs(),
      // @ts-ignore
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
      nodeResolve({  preferBuiltins: true, browser: true }), // 消除碰到 node.js 模块时⚠警告
      // @ts-ignore
      commonjs(),
      // @ts-ignore
      typescript(),
      // @ts-ignore
      gloabls(),
      builtins()
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
      nodeResolve({ preferBuiltins: true, browser: true }), // 消除碰到 node.js 模块时⚠警告
      // @ts-ignore
      commonjs(),
      // @ts-ignore
      typescript(),
      // @ts-ignore
      gloabls(),
      builtins()
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
