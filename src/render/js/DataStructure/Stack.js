         export default class Stack {
             constructor() {
                 this._size = 0
                 this._storage = {}
             }
             push(data) {
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
        //  export default {
        //      install(Vue, options) {
        //          Vue.prototype.Stack = new Stack()
        //      }
        //  }