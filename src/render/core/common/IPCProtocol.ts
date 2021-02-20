/*
 * @Author: your name
 * @Date: 2021-02-20 13:43:58
 * @LastEditTime: 2021-02-20 13:43:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\core\common\IPCProtocol.ts
 */

import { Event } from "../../utils/base/event";
import { VSBuffer } from "../../utils/base/buffer";

// IMessagePassingProtocol 为 IPC 缩写
// 消息传输协议定义
export interface IMessagePassingProtocol{
    onMessage:Event<VSBuffer>;
    send(buffer:VSBuffer):void;
}

export interface Sender { 
    // 对象上带有这个方法即为实现这个接口、属于这个接口
    // 所以使用的对象是 webContexts
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