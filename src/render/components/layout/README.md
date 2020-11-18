<!--
 * @Author: your name
 * @Date: 2020-10-05 09:59:45
 * @LastEditTime: 2020-11-18 11:12:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\layout\README.md
-->
## CSS
  - rem
    - 浏览器的默认的font-size是16px，1rem默认就等于16px。（chrome最小字体为12px）
## Attention
  - 开始时间：2020年10月25日 星期日 14:55:23
    - 试点：开始对一个页面上的第一次载入的图片进行一个额定，做一个限制
      - 预设情况
        - 一个页面现在暂定要载入 36 个(左边) + 6 个(右边) 
        - 
      - 需求技术点
        - 图片懒加载、等高瀑布流基础、无限滚动
       
  - 最后修改：2020年10月25日 星期日 14:57:18

  - 滚轮滚动事件还是正常去滚动，而是键盘事件时再自己去触发滚动
  - JavaScript组合键应该使用 keyup 事件
    - [JavaScript监听键盘事件，组合键事件](https://blog.csdn.net/projectNo/article/details/77837928)
  - 对于在我写代码的经历过程，经常需要写一个开关或者是一个对象的两个状态，我需要对 Vue Framework 写一个可复用的开关模式
    - 使用默认参数值写开关模式