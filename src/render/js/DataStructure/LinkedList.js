         /**
          * [LinkedListNode description]
          */
         class LinkedListNode {
             constructor(value, next = null) {
                 this.value = value
                 this.next = next
             }
             toString(callback) {
                 return callback ? callback(this.value) : `${this.value}`
             }
         }
         /**
          * [LinkedList description]
          */
         export class LinkedList {
             constructor() {
                 this.head = null
                 this.tail = null
                 this.length = 0
             }
             /**对链表的头添加值
              * [prepend 对链表的头添加值]
              * @param  {[type]} value [description]
              * @return {[type]}       [description]
              */
             prepend(value) {
                 const newNode = new LinkedListNode(value, this.head)
                 this.head = newNode
                 if (!this.tail) {
                     this.tail = newNode
                 }
                 this.length++
                 return this
             }
             append(value) {
                 const newNode = new LinkedListNode(value)
                 /*
                 当链表为空的时候
                  */
                 if (!this.head) {
                     this.head = newNode
                     this.tail = newNode
                     return this
                 }
                 /*
                 链表不为空时
                  */
                 this.tail.next = newNode
                 this.tail = newNode

                 this.length++
                 return this
             }
             deleteHead() {
                 /*
                 当链表为空的时候 返回null
                  */
                 if (!this.head) {
                     return null
                 }
                 const deleteNode = this.head
                 if (!this.head.next) { //当头的下一个为空时，则表明链表中只有一个元素，将链表置为空链表
                     this.head = null
                     this.tail = null
                 } else { //它被垃圾回收机制所清理了，没有了对它的引用
                     this.head = this.head.next
                 }
                 this.length--
                 return deleteNode; //可扩展的删除头节点
             }
             /** 删除尾部元素
              * [deleteTail 删除尾部元素]
              * @return {[type]} [description]
              */
             deleteTail() {
                 const deleteTail = this.tail
                 if (!this.head) { //当为空链表时 返回空
                     return null;
                 }
                 if (!this.head.next) { //1个节点
                     this.head = null
                     this.tail = null
                     return deleteTail;
                 }
                 //至少有2个节点
                 let currentNode = this.head
                 while (currentNode.next.next) {
                     currentNode = currentNode.next
                 } //从头节点开始，一次向下查找2个节点(包括设定的开始节点)，当查找的第二个节点的next 不为空时，从上一次查找节点的开头+1 例如从头节点开始查寻，当头节点和头节点所连接的节点，也就是整体链表的第二个节点的next不为空时，从头节点+1个 查找下两个节点的.next 是否为空，当为空时，currentNode 就是我们要新生成的链表的尾节点,所以之后直接把 要新生成链表的尾节点也就是 currentNode.next 设为空，由垃圾回收机制来自动处理它 (当前还未删除尾节点，)

                 currentNode.next = null
                 this.tail = currentNode
                 this.length--
                 return deleteTail;
             }
             /**
              * [delete description]
              * @param  {[type]} value [description]
              * @return {[type]}       [description]
              */
             delete(value) {
                 if (!this.head) {
                     return null;
                 }
                 let deleteNode = null
                 while (this.head && this.head.value === value) {
                     deleteNode = this.head
                     this.head = this.head.next
                 }
                 let currentNode = this.head
                 if (currentNode) {
                     while (currentNode.next) {
                         if (currentNode.next.value === value) { //如果这个值是对象，因为引用的不同，则不会运行下去
                             deleteNode = currentNode.next
                             currentNode.next = currentNode.next.next
                         } else {
                             currentNode = currentNode.next
                         }
                     }
                 }

                 this.tail = currentNode
                 return deleteNode
             }
             deleteAt(index) {
                 /*
                 当链表为空的时候
                 链表为一个节点
                 找到要删除的节点，它是一定在链表的第二个节点至倒数第二个节点之间
                 我直接从第二个开始检查
                 当节点为3个时，只有在index等于1时才会运行到while,这里可以直接删除第二个节点,无须做判断
                 如何删除
                 我要找到删除节点的(index+1)下一个节点，把下一个节点的引用给删除节点的(index-1)上一个节点的next, 不需要移动头和尾节点
                 我需要对删除的是哪个节点作出返回

                 {value,use-{value,use-{value,null}}}
                 {value1,next:use1}  use1={value2,use2}
                 {value2,next:use2}  use2={value3,null}
                 {value3,next:null}

                 {value1,next:use2}  use2={value3,null}
                 {value3,null}
                  */
                 if (!this.head) {
                     return this
                 } //当链表为空的时候
                 if (index < 0 || index > this.length) {
                     return '索引超出'
                 } //判断传入的索引是否在链表的长度中
                 if (index === 0) { //删除第一个节点，已经包括了只有一个节点的链表
                     let deleteNode = this.head
                     this.deleteHead()
                     return deleteNode
                 }
                 if (index === (this.length - 1)) {
                     let deleteNode = this.tail
                     this.deleteTail()
                     return deleteNode
                 }
                 // if (!this.head.next && index === 0) { //这里使用this.tail 会有 空链表和只有一个节点的链表的区别分不开
                 //     this.head = null
                 //     this.tail = null
                 // }
                 if (this.length === 3) {
                     let deleteNode = this.head.next
                     this.head.next = this.tail
                     this.length--
                     return deleteNode
                 }
                 let currentNode = this.head.next //第二个节点
                 let amounts = 0

                 while (currentNode) {
                     if ((index - 1) == amounts) {
                         currentNode.next = currentNode.next.next
                         this.length--
                         return currentNode.next
                     }
                     amounts++
                     currentNode = currentNode.next
                 }

             }
             /**  旋转链表
              * [reverse 旋转链表]
              * @return {[type]} [description]
              */
             reverse() {
                 //记录头节点
                 let curNode = this.head
                 let prevNode = null
                 let nextNode = null

                 //遍历链表
                 while (curNode) {
                     //存储下一个节点
                     nextNode = curNode.next
                     //将当前节点指向前一个节点
                     curNode.next = prevNode

                     //指针后移
                     prevNode = curNode
                     curNode = nextNode
                 }

                 //重置头指针和尾指针
                 this.tail = this.head
                 this.head = prevNode

                 //返回链表
                 return this
             }
             /**
              * [toArray description]
              * @return {[Array]} [description]
              */
             toArray() {
                 const nodes = []
                 let currentNode = this.head
                 while (currentNode) {
                     nodes.push(currentNode)
                     currentNode = currentNode.next
                 }

                 return nodes
             }
             /**
              * [fromArray description]
              * @return {[LinkedList]} [description]
              */
             fromArray(values) {
                 values.forEach(value => this.append(value))
                 this.length = values.length
                 return this
             }
             /** 得到链表值的数组
              * [toValueArray 得到链表值的数组]
              * @return {[type]} [description]
              */
             toValueArray() {
                 const values = []
                 let currentNode = this.head
                 // let currentValue = this.head.value
                 while (currentNode) {
                     values.push(currentNode.value)
                     currentNode = currentNode.next
                 }
                 return values
             }
         }
         export default {
             install(Vue, options) {
                 Vue.prototype.LinkedList = new LinkedList()
             }
         }
