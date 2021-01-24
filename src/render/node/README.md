<!--
 * @Author: your name
 * @Date: 2020-12-13 11:43:40
 * @LastEditTime: 2021-01-24 15:55:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\node\README.md
-->
## JavaScript 使用细节小结
  - `true` 与 `false` 可进行值计算
    - Rerference
      - [b.isDirectory() - a.isDirectory() 返回的是 true 和 false 可用来计算](https://segmentfault.com/q/1010000038460792/a-1020000038462319)
  - `Array.sort()` 的排序问题
    - V8引擎中对 `Array.sort()` 的实现，为 TimSort (为插入排序与归并排序的混合)
      - 插入排序
        > 在数组长度小于10时会被使用
        ```js
        // 旧版V8引擎源码
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

      - TimSort
        - [【深度】扒开V8引擎的源码，我找到了你们想要的前端算法（下次面试官再问算法，用它怼回去！）](https://blog.51cto.com/14160840/2435653)
        - [Timsort 最快的排序算法](https://segmentfault.com/a/1190000020280815)
        - [二分查找（面试必备）](https://segmentfault.com/a/1190000008699980)

    - 由于`Array.sort()`的默认排序方法是先将数组项全部转成字符串，再根据字符串的 Unicode 来进行比较大小。
      - 转成字符串
      - Unicode大小
    - comparefn 是用来决定比较标准的，也就是用来修改`Array.sort()`的默认排序方法
      > 
  - String.localeCompare
    - 默认排序将会把中文放到字母前面
    ```js
    ['牛','a', '阿尔','b', '木头', '3','c', '2', '1' ].sort((a,b)=>a.localeCompare(b))
    // ["1", "2", "3", "阿尔", "木头", "牛", "a", "b", "c"]
    ```
    - Reference
      - [js中的localeCompare到底是如何比较的？](http://www.qiutianaimeili.com/html/page/2020/07/20207171bfbctvh896.html)
      - [js中sort方法的排序问题及localeCompare方法](https://juejin.cn/post/6844903816597504008)
      - [JS排序：localeCompare() 方法实现中文排序、sort方法实现数字英文混合排序](https://www.cnblogs.com/goloving/p/7662676.html)
  - [Intl.Collator.prototype.compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)
  - JavaScript 的字符串比较问题
    - Reference
      - [JavaScript 中文字符串之间是怎么比较大小的](https://segmentfault.com/q/1010000038462514)
  - [JavaScript 编码规范](http://itmyhome.com/js/huan_xing.html)