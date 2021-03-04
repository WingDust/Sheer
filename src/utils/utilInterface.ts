
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
    viewline:Img[]
}
interface Vim{
    cursor:{
        postion:[number,number],
    },
    movtion:{
        Rename:boolean, 
        Yank:boolean,
        Del:boolean
    }
}
interface State{
    Config:Config,
    // FilmPath:{
        // Trees:Tree | undefined
        // status:boolean
        // checkline:string[]
    // }
    View:View
    Vim:Vim
}


export {State,Img,Config}