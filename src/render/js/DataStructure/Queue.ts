/*
 * @Author: your name
 * @Date: 2020-12-07 12:45:04
 * @LastEditTime: 2020-12-07 12:46:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\js\DataStructure\Queue.ts
 * 
 */


/**
 * @export
 * @class Queue [description: : JS队列]
 */
export class Queue {
    _oldstIndex:number
    _newstIndex:number
    _storage:any
  /**
   *Creates an instance of Queue.
   * @memberof Queue
   * _oldstIndex 
   * _newstIndex : 
   * _storage 
   */
  constructor() {
    this._oldstIndex = 1
    this._newstIndex = 1
    this._storage = {}
  }
  /**
   * [size description: 返回队列的数量大小,在获取队列大小时，它为一个最新的栈的编号，和一个最开始压栈的一个栈的编号，我需要维持它们原本编号的正确，
   * 例如，有五个栈，当删除了一个最前的一个栈，它的队列大小就是，用 6 - 2 = 4 ,在这其中6，_newstIndex:为队列中最大放入的数量,它应该是当前数量+1，_oldstIndex:为当前最开始的数据的编号]
   * @return {[type]} [description: number]
   */
  size() {
    return this._newstIndex - this._oldstIndex
  }
  /**
   * [enqueue description: 将数据添加到队列中]
   * @param  {[type]} data [description: 要添加的数据]
   * @return {[type]}      [description: ]
   */
  enqueue(data:any) {
    this._storage[this._newstIndex] = data
    this._newstIndex++
  }
  /**
   * [dequeue description: ]
   * @return {[type]} [description: ]
   */
  dequeue() {
    let oldstIndex = this._oldstIndex,
      newstIndex = this._newstIndex,
      deletedData;
    if (oldstIndex != newstIndex) {
      deletedData = this._storage[oldstIndex]
      delete this._storage[oldstIndex]
      this._oldstIndex++

      return deletedData
    }
  }
}