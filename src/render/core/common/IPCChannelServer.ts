/*
 * @Author: your name
 * @Date: 2021-02-19 21:07:38
 * @LastEditTime: 2021-02-20 19:16:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\core\common\IPC.ts
 */

import { VSBuffer } from "../../utils/base/buffer";
import { BufferReader, BufferWriter, deserialize, serialize } from "@/utils/base/buffer-utils";
import { Event } from "../../utils/base/event";
import { IDisposable } from "@/utils/base/interface";
import { CancellationToken, CancellationTokenSource } from "@/utils/base/cancelablePromise/cancelablePromise";
import { toDisposable } from "@/utils/base/disposable/disposable";

import { IMessagePassingProtocol } from "./IPCProtocol";

/** 用来服务的频道
 * @export
 * @interface IServerChannel
 * @template TContext
 */
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
/** 注册被用来服务的频道
 * 所定义的接口
 * @export
 * @interface IChanenlServer
 * @template TContext
 */
export interface IChannelServer<TContext=string>{
    registerChannel(channelName:string,channel:IServerChannel<TContext>):void
}


//#region 请求的返回类型
type IRawInitializeResponse = { type: ResponseType.Initialize };
type IRawPromiseSuccessResponse = {
  type: ResponseType.PromiseSuccess; // 类型
  id: number; // 请求 id
  data: any; // 数据
};
type IRawPromiseErrorResponse = {
  type: ResponseType.PromiseError;
  id: number;
  data: { message: string; name: string; stack: string[] | undefined };
};
type IRawPromiseErrorObjResponse = {
  type: ResponseType.PromiseErrorObj;
  id: number;
  data: any;
};
export type IRawResponse =
  | IRawInitializeResponse
  | IRawPromiseSuccessResponse
  | IRawPromiseErrorResponse
  | IRawPromiseErrorObjResponse;
interface PendingRequests{
    request:IRawPromiseRequest;
    timeoutTimer:any
}
export enum ResponseType {
  Initialize = 200, // 初始化消息返回
  PromiseSuccess = 201, // promise 成功
  PromiseError = 202, // promise 失败
  PromiseErrorObj = 203,
  EventFire = 204,
}
//#endregion

//#region 请求类型
export enum RequestType{
    Promise=100,
    PromiseCancel=101,
    EventListen = 102,
    EventDispose = 103,
}
type IRawPromiseRequest ={
    type:RequestType.Promise
    id:number
    channelName:string
    name:string
    arg:any
}

type IRawPromiseCancelRequest = {
    type:RequestType.PromiseCancel;
    id:number
}
export type IRawRequest = 
    | IRawPromiseRequest
    | IRawPromiseCancelRequest
//#endregion


/** 频道的服务类(器)
 * 
 * @export
 * @class ChanelServer
 * @implements {IChanenlServer<TContext>}
 * @implements {IDisposable}
 * @template TContext
 */
export class ChannelServer<TContext= string>
    implements IChannelServer<TContext>,IDisposable{
        private readonly channels = new Map<string,IServerChannel<TContext>>();
        private protocolListener:IDisposable |null;
        private readonly activeRequests = new Map<number,IDisposable>();
        private readonly pendingRequests = new Map<string,PendingRequests[]>();

        constructor(
            private readonly protocol:IMessagePassingProtocol,
            private readonly ctx:TContext,
            private readonly timeoutDelay:number = 1000
        ){
            this.protocolListener = this.protocol.onMessage(msg =>
                this.onRawMessage(msg)
                )
            this.sendResponse({type:ResponseType.Initialize})
        }
        /**
         * 频道的服务器来注册一个频道
         * @param {string} channelName
         * @param {IServerChannel<TContext>} channel
         * @memberof ChanelServer
         */
        registerChannel(channelName:string,channel:IServerChannel<TContext>):void{
            this.channels.set(channelName,channel)

            setTimeout(()=>this.flushPendingRequests(channelName),0)

        }
        /**
         * 将待执行的请求执行后清理掉
         * @private
         * @param {string} channelName
         * @memberof ChanelServer
         */
        private flushPendingRequests(channelName:string):void{
            const requests = this.pendingRequests.get(channelName)
            
            if (requests) {
                for (const request of requests) {
                    clearTimeout(request.timeoutTimer)
                    
                    switch (request.request.type) {
                        case RequestType.Promise:
                            this.onPromise(request.request)
                            break;
                    }
                }

                this.pendingRequests.delete(channelName)
            }
        }

        /**
         * 用于处理原始传入的 Buffer 信息
         * @private
         * @param {VSBuffer} message
         * @return {*}  {void}
         * @memberof ChanelServer
         */
        private onRawMessage(message:VSBuffer):void{
            const reader = new BufferReader(message)
            const header = deserialize(reader)
            const body = deserialize(reader)
            const type = header[0] as RequestType

            switch (type) {
                case RequestType.Promise:
                    return this.onPromise({
                        type,
                        id:header[1],
                        channelName:header[2],
                        name:header[3],
                        arg:body,
                    })
                case RequestType.PromiseCancel:
                    return this.disposeActiveRequest({type,id:header[1]})
            }


        }
        /** 根据执行结果返回
         * @private
         * @param {IRawResponse} response
         * @memberof ChanelServer
         */
        private sendResponse(response:IRawResponse):void{
            switch (response.type) {
                case ResponseType.Initialize:
                    return this.send([response.type])
                case ResponseType.PromiseSuccess:
                case ResponseType.PromiseError:
                case ResponseType.PromiseErrorObj:
                    return this.send([response.type,response.id,response.data])
            }

        }

        /** 将要送出的信息序列化，并送出
         * @private
         * @param {*} header
         * @param {*} [body=undefined]
         * @memberof ChanelServer
         */
        private send(header:any,body:any=undefined):void{
            const writer = new BufferWriter()
            serialize(writer,header)
            serialize(writer,body)
            this.sendBuffer(writer.buffer)
        }

        /** 送出信息的具体方法
         * @private
         * @param {VSBuffer} message
         * @memberof ChanelServer
         */
        private sendBuffer(message:VSBuffer):void{
            try {
                this.protocol.send(message)
            } catch (error) {
                console.log(error);
            }
        }


        /** 依据通信协议在 Client 销毁时应该将存活的请求与协议监听者全部释放
         * @memberof ChanelServer
         */
        public dispose():void{
            if (this.protocolListener) {
                this.protocolListener.dispose()
                this.protocolListener = null
            }
            this.activeRequests.forEach(d =>d.dispose())
            this.activeRequests.clear()
        }

        
        /** 释放被取消的请求
         * @private
         * @param {IRawRequest} request
         * @memberof ChanelServer
         */
        private disposeActiveRequest(request:IRawRequest):void{
            const disposable = this.activeRequests.get(request.id)
            if (disposable) {
                disposable.dispose()
                this.activeRequests.delete(request.id)
            }
        }

        /** 访问具体的服务中方法，并发出返回响应
         * @private
         * @param {IRawPromiseRequests} request
         * @memberof ChanelServer
         */
        private onPromise(request:IRawPromiseRequest):void{
            const channel = this.channels.get(request.channelName)
            if (!channel) {
                this.collectPendingRequest(request);
                return
            }
            
            const cancellationTokenSource = new CancellationTokenSource()
            let promise:Promise<any>
            try {
                promise = channel.call(
                    this.ctx,
                    request.name,
                    request.arg,
                    cancellationTokenSource.token,
                )
            } catch (err) {
                promise = Promise.reject(err)
            }

            const {id} = request
            promise.then(
                data=>{
                    this.sendResponse(<IRawResponse>{id,data,type:ResponseType.PromiseSuccess})
                    this.activeRequests.delete(request.id)
                },
                err =>{
                    if (err instanceof Error){
                        this.sendResponse(<IRawResponse>{
                            id,data:{
                                message:err.message,
                                name:err.name,
                                stack:err.stack
                                    ? err.stack.split
                                    ? err.stack.split('\n')
                                    : err.stack
                                    : undefined,
                            },
                            type:ResponseType.PromiseError,
                        })
                    }
                    else{
                        this.sendResponse(<IRawResponse>{
                            id,data:err,
                            type:ResponseType.PromiseErrorObj
                        })
                    }
                    this.activeRequests.delete(request.id)
                }
            )
            const disposable = toDisposable(()=>cancellationTokenSource.cancel())
            this.activeRequests.set(request.id,disposable)
        }

        private collectPendingRequest(request:IRawPromiseRequest):void{

        }
    }