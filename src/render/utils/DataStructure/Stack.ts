/*
 * @Author: your name
 * @Date: 2020-08-25 16:51:56
 * @LastEditTime: 2021-01-24 16:12:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\js\DataStructure\Stack.ts
 */
export default class Stack {
    _size:number
    _storage:any
    constructor() {
        this._size = 0
        this._storage = {}
    }
    push(data:any) {
        let size = this._size++
        this._storage[size] = data
    }
    pop() {
        let size = this._size,
            deletedData;
        if (size) {
            deletedData = this._storage[size]
            delete this._storage[size]
            this._size--

            return deletedData
        }
    }

}