import { Event } from "../../utils/base/event";
import { VSBuffer } from "../../utils/base/buffer";
// IMessagePassingProtocol 为 IPC 缩写

/**
 * 消息传输协议规定：
 * 1. 客户端在初始化时向服务端发送 从`ipc:hello`频道发送消息
 * 2. 服务端初始化时开始监听 `ipc:hello` 频道
 * 3. 当客户端窗口关闭等，向 `ipc:disconnect` 发送消息，告知失去连接
 * 4. 正常发送消息均从 `ipc:message` 发送
 */

/** 消息传输协议定义，规范、监管约束通信
 * 所以应以依赖注入方式写入各类，接口
 * @export
 * @interface IMessagePassingProtocol
 */
export interface IMessagePassingProtocol{
    onMessage:Event<VSBuffer>; // 函数
    send(buffer:VSBuffer):void; // 函数
}

export interface Sender { 
    // 对象上带有这个方法即为实现这个接口、属于这个接口
    // 所以使用的对象是 ipcMain ipcRenderer
    send(channel: string, msg: Buffer | null): void;
}

export class Protocol implements IMessagePassingProtocol {
  constructor(
    private readonly sender: Sender,
    readonly onMessage: Event<VSBuffer>,
  ) {}

  send(message: VSBuffer): void {
    try {
      this.sender.send('ipc:message', <Buffer>message.buffer);
    } catch (e) {
      // systems are going down
    }
}

  dispose(): void {
    this.sender.send('ipc:disconnect', null);
  }
}