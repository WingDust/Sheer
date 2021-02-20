/*
 * @Author: your name
 * @Date: 2021-02-20 18:42:13
 * @LastEditTime: 2021-02-20 18:53:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\core\common\IPChannelClient.ts
 */

import { Emitter } from "@/utils/base/event";
import { IDisposable } from "@/utils/base/interface";
import { IRawResponse } from "./IPC";


type IHandler = (response:IRawResponse) => void

export interface IChannelClient{
    getChannel<T extend IChanel>(channelName:string):T
}

enum State{
    Uninitialized,
    Idle // 就绪
}

export class ChanelClient implements IChannelClient,IDisposable{
    private protocolListener:IDisposable | null
    private state:State = State.Uninitialized
    private lastRequestId = 0

    private readonly activeRequests = new Set<IDisposable>()
    private readonly handlers = new Map<number,IHandler>()
    private readonly _onDidInitialized = new Emitter<void>()

    readonly onDidInitialized = this._onDidInitialized
    constructor(){

    }
}