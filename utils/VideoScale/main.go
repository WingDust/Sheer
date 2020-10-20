package main

import (
	"fmt"
	"os/exec"
	"os"
	"bytes"
	// "io/ioutil"
	// "reflect"
	"path/filepath"
	"regexp"
	// "sort"
)
// 使用变量来在内存中保存为视频文件的后缀名，使用后缀名区别文件类型
// var FileSuffix = []string{"mp4","mkv","rmvb","ts","avi"}

// .[a-zA-Z\d][\d]*$ 从后匹配 只匹配到文件后缀名 [a-zA-Z\d]表示数字与大小写字母
var Suffix = regexp.MustCompile(`\.(mp4|mkv|rmvb|ts|avi)$`)

// 
var excludeSuffix = regexp.MustCompile(`Invalid data found when processing input`)

/*匹配字符串中所有的数字*/
var Scale = regexp.MustCompile(`\d+`)


/*
1920*1080
1280*720
*/

/*保存视频各类分辩率的数量*/
// var VideoRate map[string]int
// [定义全局变量map](https://studygolang.com/articles/11575?fr=sidebar)
var VideoRate = make(map[string]int)

// const filesuffix=
/* 这个是多行注释
* 备注: goLang语言中没有常量数组 这是为什么要自己去百度
*/

// 通过在 命令行中调用 ffprobe.exe 来获取视频文件的高宽（为字符串数据类型）
func getVideoScale(path string)string{

	f := exec.Command("cmd","/C","ffprobe","-v","error","-show_entries","stream=width,height","-of","default=noprint_wrappers=1",path)
	var out bytes.Buffer
    var stderr bytes.Buffer
    f.Stdout = &out
	f.Stderr = &stderr
	err2 := f.Run()
		if err2 != nil {
		// return	 fmt.Println(stderr.String())
		return	 stderr.String()
		}
	return out.String()
}

// 根据文件后缀名来，判断路径下的文件是否是视频文件
// func judgement(path string,filesuffix *[]string)bool{
func judgement(path string){
	// fmt.Println(path)
	currentsuffix := Suffix.FindString(path)
	// fmt.Println(currentsuffix)
	if currentsuffix!=""{
		// fmt.Println(getVideoScale(path))
		if excludeSuffix.MatchString(getVideoScale(path)){
			return
		}
		VideoScale:=Scale.FindAllString(getVideoScale(path),2) 
		// fmt.Println(VideoScale)
		VideoRate[VideoScale[0]+"*"+VideoScale[1]]++
	}
}

/**
* 判断所给路径文件/文件夹是否存在
*/
func Exists(path string)bool{
	_,err := os.Stat(path) //os.Stat获取文件信息
	if err != nil {
		if os.IsExist(err){
			return true
		}
		return false
	}
	return true
}
// 判断所给路径是否为文件夹
func IsDir(path string)bool{
	s,err := os.Stat(path)
	if err != nil {
		return false
	}
	return s.IsDir()
}
// 判断所给路径是否为文件
func IsFile(path string)bool{
	return !IsDir(path)
}

// 将数据排序
func Order(){
	
}

/**
* 运行函数
*/
func Run(args []string)  {
	var rootpath string
	// 1 检查给出的命令行参数是否为路径与是否路径存在，并将路径传出
	// for i,v := range args{
	// 	if i==1 {
	// 		if IsDir(v) {
	// 			if Exists(v){
	// 				rootpath = v
	// 				break
	// 			}else{
	// 			fmt.Println("你传入的参数:"+v+" 是一个路径，但是这个路径在你的电脑上不存在，还是傻瓜 =_-")
	// 			return
	// 			}
	// 		}else{
	// 			fmt.Println("你传入的参数: "+v+" 不是一个路径，傻瓜 -_-")
	// 			return
	// 		}
	// 	}
	// 	fmt.Println("args[%v]=%v\n",i,v)
	// }
	if IsDir(args[1]){
		if Exists(args[1]){
			rootpath = args[1]
		}else{
			fmt.Println("你传入的参数:"+args[1]+" 是一个路径，但是这个路径在你的电脑上不存在，还是傻瓜 =_-")
			return
		}
		
	}else{
			fmt.Println("你传入的参数: "+args[1]+" 不是一个路径，傻瓜 -_-")
			return
	}


	// 2 根据路径进行递归式的视频文件处理
	if rootpath!="" {
	// files,err := ioutil.ReadDir(rootpath)
	// if err != nil {
	// fmt.Println(err.Error())
	// }else{

	// 	for _,f := range files{
	// 		if f.IsDir(){

	// 		}else{
	// 			if judgement(f.Name(),&filesuffix) {
	// 				getVideoScale(f.Name())
	// 			}
	// 		}
	// 	}

	// }
	filepath.Walk(rootpath,func(path string,info os.FileInfo,err error)error{

		// for v := range VideoRate {
		// 	fmt.Println(v,"：",VideoRate[v])
		// }
		if !info.IsDir(){
		// fmt.Println(path)
		judgement(path)
		}
		return nil
	})
	// for _, v := range VideoRate  {
	// 	fmt.Println(v)
	// } //两个代码是运行是有区别的
	for v := range VideoRate {
		fmt.Println(v,"：",VideoRate[v])
	}
	}
	
}

func main(){
	// f,err := exec.Command("pwd").Output()
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }
	// fmt.Println(string(f))
	// pwd,_ := os.Getwd()
	// fmt.Println(filepath.Join(pwd,"*"))
	// files,err := ioutil.ReadDir(pwd)
	// fmt.Println(files[0])
	// fmt.Println(reflect.TypeOf(files))
	// if err != nil{
	// 	fmt.Println(reflect.TypeOf(files))
	// }

	// fmt.Println(reflect.TypeOf(os.Args))
	Run(os.Args)


}
