/*
 * @Author: your name
 * @Date: 2021-02-21 10:38:24
 * @LastEditTime: 2021-02-21 10:40:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\core\common\IPCConnet.ts
 */

import { ChannelServer } from "./IPCChannelServer";
import { ChannelClient } from "./IPChannelClient";

export interface Client<TContext>{
    readonly ctx:TContext
}

export interface Connection<TContext> extends Client<TContext>{
    readonly channelServer:ChannelServer<TContext>
    readonly channelClient:ChannelClient
}
