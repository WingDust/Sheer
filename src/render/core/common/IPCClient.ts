/*
 * @Author: your name
 * @Date: 2021-02-21 11:38:56
 * @LastEditTime: 2021-02-21 13:25:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\core\common\IPCClient.ts
 */

import { Event } from "../../utils/base/event";
import { VSBuffer } from "@/utils/base/buffer";
import { BufferWriter, serialize } from "@/utils/base/buffer-utils";
import { IDisposable } from "@/utils/base/interface";
import { ipcRenderer } from "electron";
import { ChannelServer, IChannelServer, IServerChannel } from "./IPCChannelServer";
import { ChannelClient, IChannel, IChannelClient } from "./IPChannelClient";

import { IMessagePassingProtocol, Protocol } from "./IPCProtocol";

export class IPCClient<TContext=string>
    implements IChannelClient,IChannelServer<TContext>,IDisposable{
        private readonly channelClient:ChannelClient;
        private readonly channelServer:ChannelServer<TContext>;

        constructor(protocol:IMessagePassingProtocol,ctx:TContext){
            const writer  = new BufferWriter()
            serialize(writer,ctx)
            protocol.send(writer.buffer)

            this.channelClient = new ChannelClient(protocol)
            this.channelServer = new ChannelServer(protocol,ctx)
        }
        getChannel<T extends IChannel>(channelName:string):T{
            return this.channelClient.getChannel(channelName)
        }
        registerChannel(
            channelName:string,
            channel:IServerChannel<TContext>
        ):void{
            this.channelServer.registerChannel(channelName,channel)
        }
        dispose():void{
            this.channelClient.dispose()
            this.channelServer.dispose()
        }
    }

export class Client extends IPCClient implements IDisposable{
    private readonly protocol:Protocol;
    
    private static createProtocol():Protocol{
        const onMessage = Event.fromNodeEventEmitter<VSBuffer>(
            ipcRenderer,
            'ipc:message',
            (_: any,message:Buffer) => VSBuffer.wrap(message),
        )
        ipcRenderer.send('ipc:hello')
        return new Protocol(ipcRenderer,onMessage)
    }

    constructor(id:string){
        const protocol = Client.createProtocol()
        super(protocol,id)
        this.protocol = protocol
    }

    dispose():void{
        this.protocol.dispose()
    }
}