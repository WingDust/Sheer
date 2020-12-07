/*
 * @Author: your name
 * @Date: 2020-08-25 17:16:12
 * @LastEditTime: 2020-12-07 15:50:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\js\DataStructure\Tree.d.ts
 */
export declare class Tree {
    constructor(data:string);
    traverseDF(callback:any):void;
    traverseBF(callback:any):void;
    getNodeDeepth(nodedata:any):number;
}

export declare class Node {
    data:string;
    parent:null|Node;
    children:Array<any>;
    constructor(data:string) ;
    NodeDeepth():number;
}