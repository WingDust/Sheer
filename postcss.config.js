/*
 * @Author: your name
 * @Date: 2021-02-03 19:27:04
 * @LastEditTime: 2021-02-04 13:44:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\postcss.config.js
 */
module.exports ={
	plugins:[
	  require('postcss-import'),
  	  require('tailwindcss'),
      require('autoprefixer'),
	]
}
