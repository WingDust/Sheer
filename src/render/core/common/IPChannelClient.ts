/*
 * @Author: your name
 * @Date: 2021-02-20 18:42:13
 * @LastEditTime: 2021-02-21 13:43:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\core\common\IPChannelClient.ts
 */

import { Event } from "../../utils/base/event";
import { VSBuffer } from "@/utils/base/buffer";
import { CancelablePromise, CancellationToken, createCancelablePromise } from "@/utils/base/cancelablePromise/cancelablePromise";
import { Emitter } from "@/utils/base/event";
import { IDisposable } from "@/utils/base/interface";
import { BufferReader, BufferWriter, deserialize, serialize } from "@/utils/base/buffer-utils";
import { canceled } from "@/utils/base/errors";
import { combinedDisposable, toDisposable } from "@/utils/base/disposable/disposable";

import { IRawRequest, IRawResponse, RequestType, ResponseType } from "./IPCChannelServer";
import { IMessagePassingProtocol } from "./IPCProtocol";

//#region 
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
//#endregion


/** 频道的客户端
 * @export
 * @class ChanelClient
 * @implements {IChannelClient}
 * @implements {IDisposable}
 */
export class ChannelClient implements IChannelClient,IDisposable{
    // 协议的监听者
    private protocolListener:IDisposable | null
    private state:State = State.Uninitialized // 频道的状态
    private lastRequestId = 0 // 

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
            listen(event:string,arg:any){

            }
        } as T
    }
    private requestPromise(
        channelName:string,
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

            const result = new Promise((c,e)=>{
                if (cancellationToken.isCancellationRequested){
                    return e(canceled())
                }
                let uninitializedPromise:CancelablePromise<void> | null
                = createCancelablePromise(_=>this.whenInitialized())
                uninitializedPromise.then(()=>{
                    uninitializedPromise = null

                    const handlers:IHandler = response =>{
                        console.log(
                            'main process response',
                            JSON.stringify(response,null,2)
                        )
                        switch (response.type) {
                            case ResponseType.PromiseSuccess:
                                this.handlers.delete(id);
                                c(response.data);
                                break;
                            case ResponseType.PromiseError:
                                this.handlers.delete(id);
                                const error = new Error(response.data.message);
                                (<any>error).stack = response.data.stack
                                error.name = response.data.name
                                e(error)
                                break;
                            case ResponseType.PromiseErrorObj:
                                this.handlers.delete(id);
                                e(response.data)
                                break;
                        }
                    }

                    this.handlers.set(id,handlers)

                    this.sendRequest(request)
                })
                
                const cancel = () =>{
                    if (uninitializedPromise) {
                        uninitializedPromise.cancel()
                        uninitializedPromise=null
                    } else {
                        this.sendRequest({id,type:RequestType.PromiseCancel})
                    }
                    e(canceled())
                }

                const cancellationTokenListener = cancellationToken.onCancellationRequested(
                    cancel
                )

                disposable = combinedDisposable(
                    toDisposable(cancel),
                    cancellationTokenListener
                )
                this.activeRequests.add(disposable)
            })
            
            return result.finally(()=>{this.activeRequests.delete(disposable)})
    }

    private sendRequest(request:IRawRequest):void{
        switch (request.type) {
            case RequestType.Promise:
                return this.send(
                    [request.type,request.id,request.channelName,request.name],
                    request.arg
                )
            case RequestType.PromiseCancel:
                return this.send([request.type,request.id])
        }
    }

    private send(header:any,body:any=undefined):void{
        const writer = new BufferWriter()
        serialize(writer,header)
        serialize(writer,body)
        this.sendBuffer(writer.buffer)
    }

    private sendBuffer(message:VSBuffer):void {
        try {
            this.protocol.send(message)
        } catch (error) {
            console.log(error);
        }
        
    }

    dispose():void{
        if (this.protocolListener) {
            this.protocolListener.dispose()
            this.protocolListener = null
        }
        
        this.activeRequests.forEach(p => p.dispose())
        this.activeRequests.clear()
    }

    private whenInitialized():Promise<void>{
        if (this.state === State.Idle) {
            return Promise.resolve()
        } else {
            return Event.toPromise(this.onDidInitialized)
        }
    }
}
