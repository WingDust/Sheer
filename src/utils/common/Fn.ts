

export async function initwasm(init:any) {
  const {add} = await init()
  return add
}
