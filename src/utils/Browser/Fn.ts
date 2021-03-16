
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
  // let flag = true
  return function (e:any) {// 返回出来的是一个函数定义
      // if (timeoutID != null&&flag) clearTimeout(timeoutID) //如果存在timeID
      if (timeoutID!=null ) clearTimeout(timeoutID) //如果存在timeID
      timeoutID = setTimeout(fn,wait,e)
  }
}

export function throttle(fn:Function,wait:number,immediate:boolean=false) {
  let timeoutID:number|null = null
  // let flag = true
  return () =>{
    if (timeoutID!=null) clearTimeout(timeoutID)
    if (immediate){ fn.call(null); return immediate=false}
    timeoutID = setTimeout(fn,wait)
  }
}

// 节流(ts)
export class Throttle {
  private timer: number | undefined
  private stop: boolean = false //做 Open Closed Principle
  private death: boolean = false//表示被包装的节流函数的死亡
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  public use (func: Function, delay: number, immediate: boolean = false): Function {
    let flag = true
    const self = this
    return (...args: any) => {
      if (this.death) {
        func.apply(this, args)
        return
      }
      if (this.stop) {
        func.apply(this, args)
        return
      }
      if (immediate) {
        func.apply(this, args)
        immediate = false
        return
      }
      if (!flag) {
        return
      }
      flag = false
      self.timer = window.setTimeout(() => {
        func.apply(this, args)
        flag = true
      }, delay)
    }
  }

  // 销毁
  public destroy() {
    this.death = true
    this.stop = true
    if (!!this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }
  // 开启
  public open() {
    if (!this.death) {
      this.stop = false
    }
  }
  // 关闭
  public close() {
    this.stop = true
  }
}

// [判断元素是否有滚动条](https://segmentfault.com/a/1190000004011073?utm_source=sf-related)
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