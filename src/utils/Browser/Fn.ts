
export function height():number {
    let dom:DOMRect = document.activeElement!.getBoundingClientRect()
    if (dom.top==200) return 1 // 在第一层为 顶部的margin 50 + 图片高度 150
    return (dom.top-200)/208+1   // 后面即为 减去上面的 / （16 gird 间隔 +192 图片+input）
}

export function setsibepostion(h:number,el:HTMLElement):number{
  let Rects:DOMRectList = el.getClientRects()
  // let Rects:DOMRectList = document.getElementsByClassName("e")[0].children[0].getClientRects()
  if (h>Rects.length) return Rects.length // 即少于6个的情况
  else return h
}

// 防抖
export function debounce(fn:Function,wait:number) {
  let timeoutID:any = null
  let flag = true
  return function (e:any) {
      if (timeoutID != null&&flag) clearTimeout(timeoutID) 
      timeoutID = setTimeout(fn,wait,e,flag)
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