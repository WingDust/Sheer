
// 防抖
export function debounce(fn:Function,wait:number) {
  let timeoutID:any = null
  let flag = true
  return function (e:any) {
      if (timeoutID != null&&flag) clearTimeout(timeoutID) 
      timeoutID = setTimeout(fn,wait,e,flag)
  }
}

export async function initwasm(init:any) {
  const {add} = await init()
  return add
}