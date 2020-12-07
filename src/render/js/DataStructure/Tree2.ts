import {
  Queue
} from './Queue'
class Node {
  data:any;
  parent:null |Node;
  children:Array<any>;

  constructor(data:any) {
    this.data = data
    this.parent = null
    this.children = []
  }

}
export class Tree {

  data:any;
  _root:Node;
  currentNodeDeepth:number;
  constructor(data:any) {
    let node = new Node(data)
    this._root = node
    this.currentNodeDeepth = 1
  }
  /**
   * [traverseDF description:  深度优先检索树 同步 Sync]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  traverseDF(callback:Function):void {
    (function recurse(currentNode) {
      for (let i = 0, length = currentNode.children.length; i < length; i++) {
        recurse(currentNode.children[i])
      }
      callback(currentNode)
    })(this._root)
  }
  /**
   * [traverseBF description: 宽度优先检索树, ]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  traverseBF(callback:Function):void {
    let queue = new Queue()

    queue.enqueue(this._root)
    let currentNode = queue.dequeue();

    while (currentNode) {
      for (let i = 0, length = currentNode.children.length; i < length; i++) {
        queue.enqueue(currentNode.children[i])
      }
      callback(currentNode)
      currentNode = queue.dequeue()
    }
  }
  /**
   * [contains description]
   * @param  {Function} callback  [description]
   * @param  {Function}   traversal [description]
   * @return {[type]}             [description]
   */
  contains(callback:Function, traversal:Function) {
    traversal.call(this, callback)
  }
  /**
   * [add description: 为 Node 添加 Node 子元素]
   * @param {[type]} data      [description: 要添加的数据]
   * @param {[type]} toData    [description: 为添加到那个节点上，用这个节点上的数据来表明]
   * @param {[type]} traversal [description: 以种方法来检索要被添加到的节点，用来添加]
   */
  add(data:any, toData:any, traversal:Function) {
    let child = new Node(data),
      parent :null |Node =null,
      callback = function(node:Node) {
        if (node.data === toData) {
          parent = node
        }
      };
    this.contains(callback, traversal)

    if (parent) {
      parent!.children.push(child)
      child.parent = parent
    } else {
      throw new Error('Cannot add node to non-existent parent')
    }
  }
  remove(data, fromData, traversal) {
    let tree = this,
      parent = null,
      childToRemove = null,
      index;

    let callback = function(node) {
      if (node.data === fromData) {
        parent = node
      }
    }

    this.contains(callback, traversal)

    if (parent) {
      index = tree.findIndex(parent.children, data)
      if (index === undefined) {
        throw new Error('Node to remove does not exist')
      } else {
        childToRemove = parent.children.splice(index, 1)
      }
    } else {
      throw new Error('Parent does not exist.')
    }
    return childToRemove
  }
  /**
   * [findIndex description: ]
   * @param  {[type]} arr  [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  findIndex(arr, data) {
    let index
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].data === data) {
        index = i
      }
    }
    return index
  }

  /**
   * [getNodeDeepth description: 根据节点的数据来检测，返回节点的深度]
   * @param  {[type]} nodedata [description: 要检测节点的数据]
   * @return {[type]}          [description: number]
   */
  getNodeDeepth(nodedata:any) {
    //let that = this
    this.traverseBF((node:Node) => {
      if (node.data == nodedata) {
        this.NodeDeepth(node)
      }
    })
    let currentNodeDeepth = this.currentNodeDeepth
    // 当父节点查到 null即为 到顶将 当前节点深度置 1
    this.currentNodeDeepth=1
    return currentNodeDeepth
  }
  /**
   * [NodeDeepth description: recursive式回计算节点的深度]
   * @param {[type]} node [description]
   */
  NodeDeepth(node:Node) {
    if (node.parent !== null) {
      this.currentNodeDeepth++
      this.NodeDeepth(node.parent)
    }
  }

}



// Vue 2.6
// export default {
//   install(Vue, options) {
//     Vue.prototype.Tree = Tree
//   }
// }