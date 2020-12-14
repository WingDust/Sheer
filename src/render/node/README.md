<!--
 * @Author: your name
 * @Date: 2020-12-13 11:43:40
 * @LastEditTime: 2020-12-14 19:27:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\node\README.md
-->
## JavaScript 使用细节小结
  - `true` 与 `false` 可进行值计算
    - Rerference
      - [b.isDirectory() - a.isDirectory() 返回的是 true 和 false 可用来计算](https://segmentfault.com/q/1010000038460792/a-1020000038462319)
  - `Array.sort()` 的排序问题
    - V8引擎中对 `Array.sort()` 的实现分为两种，一为插入排序，二为快速排序
      - 插入排序
      > 在数组长度小于10时会被使用
      ```js
      // V8引擎源码
      /**
       * @param {Array}  a    要被排序的数组
       * @param {number} from 开始位置下标
       * @param {number} to   结束位置下标
       **/
      function InsertionSort(a, from, to) {
      for (var i = from + 1; i < to; i++) {
      var element = a[i];//从位置2开始
      for (var j = i - 1; j >= from; j--) {
        var tmp = a[j];//从位置1开始
        var order = comparefn(tmp, element);
        if (order > 0) {
          a[j + 1] = tmp;
        } else {
          break;
        }
      }
      a[j + 1] = element;
      }
      };
      ```

  - JavaScript 的字符串比较问题
    - Reference
      - [JavaScript 中文字符串之间是怎么比较大小的](https://segmentfault.com/q/1010000038462514)