export {}
// [TS2669: Augmentations for the global scope can only be directly nested in external modules...的解决方案](https://blog.csdn.net/HermitSun/article/details/104104762)

// type t = {scrollTop:number,scrollLeft:number}

declare global{
    interface HTMLElement{
        [key:string]:number
    }
}