
export function height():number {// -1 是因为以 0 开头
    let dom:DOMRect = document.activeElement!.getBoundingClientRect()
    if (dom.top==190) return 1 -1 // 在第一层为 顶部的margin 40 + 图片高度 150
    return Math.ceil((dom.top-190)/208) // 后面即为 减去上面的 / （8 gird 间隔 +200 图片+input）
}


/** 防抖
 * @export
 * @param {Function} fn
 * @param {number} wait
 * @return {*} 
 */
export function debounce(fn:Function,wait:number) {
  let timeoutID:number|null = null
  let flag = true
  return function (e:any) {// 返回出来的是一个函数定义
      if (timeoutID != null&&flag) clearTimeout(timeoutID) 
      timeoutID = setTimeout(fn,wait,e,flag)
  }
}

export function throttle(fn:Function,wait:number,immediate:boolean) {
  let flag = true
  // let self = this
  return (...args:any) =>{

  }

  
}

export function hasScroll(el:HTMLElement, direction = 'vertical') {
  // scrollTop 和 scrollLeft 可以被设置为任何整数值,但如果一个元素不能被滚动 scrollTop 将被设置为0。
      var eleScroll = (direction === 'vertical') ? 'scrollTop' : 'scrollLeft';
      var result = !!el[eleScroll] // 判断 scrollTop 和 scrollLeft 是 0，还是其他数值
    // 如果是其他数值则有滚动条
    // 如果是0，设置为1，看看 scrollTop 和 scrollLeft 效果，如果恢复成0，则没有滚动条
  
      if (!result) {
          el[eleScroll] = 1;
          result = !!el[eleScroll];
          el[eleScroll] = 0;
      }
      return result;
}