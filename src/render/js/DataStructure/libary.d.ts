export declare class File {
    constructor();
    fsReadDir(dir:any):void;
    FileTree(dirPath:string,Tree:any,callback:any):Promise<File>;
}