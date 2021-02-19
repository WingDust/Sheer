/*
 * @Author: your name
 * @Date: 2021-02-19 21:07:38
 * @LastEditTime: 2021-02-19 21:40:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\core\common\IPC.ts
 */

import { Event } from "../../utils/base/event";
import { CancellationToken } from "@/utils/base/cancelablePromise/cancelablePromise";

export interface IServerChannel<TContext=string>{
    call<T>(
        ctx:TContext,
        command:string,
        arg?:any,
        cancellationToken?:CancellationToken,
    ):Promise<T>
    listen<T>(
        ctx:TContext,
        event:string,
        arg?:any
    ):Event<T>
}

export interface IChanenlServer<TContext=string>{
    registerChannel(channelName:string,channel:IServerChannel<TContext>):void
}