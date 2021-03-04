
// 定义接口要 首字母大写
interface Config{
    // [key:string]:string[] | null
    film:string
    store:string
}
interface Img{
  file:string
  lable:string
}
interface View{
    sibebar:boolean
    tagline:string[],
    viewline:Img[]
    sibeline:Img[]
}
interface Vim{
    cursor:{
        postion:[number,number],
        sibepostion:number
    },
    movtion:{
        Rename:boolean, 
        Yank:boolean,
        Del:boolean
    }
}
interface State{
    Config:Config,
    View:View
    Vim:Vim
}


export {State,Img,Config}