
// 定义接口要 首字母大写
interface Img{
  file:string
  lable:string
}

interface CorsurStatus{
    keycode:string
    sibepostion?:number
}


interface Config{
    // [key:string]:string[] | null
    film:string
    store:string
}

interface View{
    sibebar:boolean
    tagline:string[],
    viewline:Img[],
    sibeline:Img[]
}
interface Vim{
    cursor:{
        postion:[number,number],
        sibepostion:number,
        into:boolean
    },
    movtion:{
        Rename:boolean, 
        Yank:boolean,
        Del:boolean
    }
    register:Img
}


interface State{
    Config:Config,
    View:View
    Vim:Vim
}


export {State,Img,Config, CorsurStatus}