import { Event } from "../../utils/base/event";
import { ChannelServer } from "./IPCChannelServer";
import { ChannelClient } from "./IPChannelClient";
import { IMessagePassingProtocol } from "./IPCProtocol";

export interface Client<TContext>{
    readonly ctx:TContext
}

export interface Connection<TContext> extends Client<TContext>{
    readonly channelServer:ChannelServer<TContext>
    readonly channelClient:ChannelClient
}

// 客户端连接事件接口
export interface ClientConnectionEvent {
  protocol: IMessagePassingProtocol;
  /** 断开连接事件
   * @type {Event<void>}
   * @memberof ClientConnectionEvent
   */
  onDidClientDisconnect: Event<void>;
}