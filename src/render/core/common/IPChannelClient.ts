/*
 * @Author: your name
 * @Date: 2021-02-20 18:42:13
 * @LastEditTime: 2021-02-20 20:01:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\core\common\IPChannelClient.ts
 */

import { Event } from "../../utils/base/event";
import { VSBuffer } from "@/utils/base/buffer";
import { CancellationToken } from "@/utils/base/cancelablePromise/cancelablePromise";
import { Emitter } from "@/utils/base/event";
import { IDisposable } from "@/utils/base/interface";
import { BufferReader, deserialize } from "@/utils/base/buffer-utils";

import { IRawResponse, ResponseType } from "./IPCChannelServer";
import { IMessagePassingProtocol } from "./IPCProtocol";


type IHandler = (response:IRawResponse) => void

// 频道客户端接口
export interface IChannel{
    call<T>(
        command:string,
        arg?:any,
        cancellationToken?:CancellationToken
    ):Promise<T>
    listen<T>(event:string,arg?:any):Event<T>;
}

export interface IChannelClient{
    getChannel<T extends IChannel>(channelName:string):T
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

    readonly onDidInitialized = this._onDidInitialized.event
    constructor(private readonly protocol:IMessagePassingProtocol){
        this.protocolListener = this.protocol.onMessage(msg =>this.onBuffer(msg))
    }


    /** 解读 Buffer 中的信息，并依信息头做出处理
     * @private
     * @param {VSBuffer} message
     * @return {*}  {void}
     * @memberof ChanelClient
     */
    private onBuffer(message:VSBuffer):void {
        const reader = new BufferReader(message)
        const header = deserialize(reader)
        const body = deserialize(reader)
        const type:ResponseType = header[0]

        switch (type) {
            case ResponseType.Initialize:
                return this.onResponse({type:header[0]})
            case ResponseType.PromiseSuccess:
            case ResponseType.PromiseError:
            case ResponseType.EventFire:
            case ResponseType.PromiseErrorObj:
                return this.onResponse({ type: header[0], id: header[1], data: body });
        }
    }


    /** 处理信息的具体方法
     * @private
     * @param {IRawResponse} response
     * @memberof ChanelClient
     */
    private onResponse(response:IRawResponse):void{
        if (response.type === ResponseType.Initialize){
            this.state = State.Idle
            this._onDidInitialized.fire()
            return
        }
        const handlers = this.handlers.get(response.id)
        if (handlers){
            handlers(response)
        }
    }

    getChannel<T extends IChannel>(channelName:string):T{
        const that = this
        return {
            call(command:string,arg?:any,cancellationToken?:CancellationToken){
                return that.requestPromise(
                    channelName,
                    command,
                    arg,
                    cancellationToken
                )
            },
            listen(event:sting,arg:any){

            }
        } as T
    }
    private requestPromise(
        channelName:sting,
        name:string,
        arg?:any,
        cancellationToken=CancellationToken.None
        ):Promise<any>{
            const id = this.lastRequestId++
            const type = RequestType.Promise
            const request:IRawRequest = {id,type,channelName,name,arg}

            if (cancellationToken.isCancellationRequested){
                return Promise.reject(canceled())
            }
            let disposable:IDisposable

            const result = new Promise((c,e)=>{})
        }

}