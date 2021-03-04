## JavaScript 循环中不要使用 `Array.splice()`
  - Reference
    - [doApplyEdits Lines inserted using splice](https://github.com/Microsoft/monaco-editor/issues/351)
  ```ts
    let firstlayer:string[]=[] 
    let paths: Dirent[] = await Files.fsReadDir(dirPath);
    paths.sort(Files.compareFiles)
    paths.reverse()
    let len:number =paths.length
    while (len--){ // 倒序
        if(paths[len].isFile()&&Files.getFileType(paths[len].name)){//第一层视频
        firstlayer.push(path.join(dirPath,paths[len].name))
        }
        // else { //
        //   paths.splice(len,1)
        // }
    }
    if (firstlayer.length!=0) {
        LinkedList.append(firstlayer)
    }
  ```
