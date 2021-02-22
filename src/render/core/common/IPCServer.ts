import { VSBuffer } from "@/utils/base/buffer";
import { BufferReader, deserialize } from "@/utils/base/buffer-utils";
import { toDisposable } from "@/utils/base/disposable/disposable";
import { Emitter,Event } from "@/utils/base/event";
import { IDisposable } from "@/utils/base/interface";
import { ipcMain } from "electron";
import { ChannelClient } from "./IPChannelClient";
import { ChannelServer, IChannelServer, IServerChannel } from "./IPCChannelServer";
import { ClientConnectionEvent, Connection } from "./IPCConnection";
import { Protocol } from "./IPCProtocol";

export class IPCServer<TContext = string>
    implements IChannelServer<TContext>,IDisposable{
        // 保存用来供服务（正存在的）的频道
        private readonly channels = new Map<string,IServerChannel<TContext>>()
        private readonly _connections = new Set<Connection<TContext>>();
        private readonly _onDidChangeConnections = new Emitter<Connection<TContext>>()

        // 一旦
        readonly onDidChangeConnection = this._onDidChangeConnections.event

        get connections():Array<Connection<TContext>>{
            const result:Array<Connection<TContext>> = []
            this._connections.forEach(ctx=>result.push(ctx))
            return result
        }

        dispose():void{
            this.channels.clear()
            this._connections.clear()
            this._onDidChangeConnections.dispose()
        }
        registerChannel(
            channelName: string,
            channel: IServerChannel<TContext>,
        ): void {
            this.channels.set(channelName, channel);

            // 同时在所有的连接中，需要注册频道
            this._connections.forEach(connection => {
            connection.channelServer.registerChannel(channelName, channel);
        });
        }
        constructor(onDidClientConnect:Event<ClientConnectionEvent>){
            onDidClientConnect(({protocol,onDidClientDisconnect})=>{
                const onFirstMessage = Event.once(protocol.onMessage)

                onFirstMessage(msg =>{
                    const reader = new BufferReader(msg)
                    const ctx = deserialize(reader) as TContext
                    const channelServer = new ChannelServer(protocol,ctx)
                    const channelClient = new ChannelClient(protocol)

                    this.channels.forEach((channel,name)=>channelServer.registerChannel(name,channel))

                    const connection:Connection<TContext> = {
                        channelServer,
                        channelClient,
                        ctx
                    }
                    this._connections.add(connection)
                    
                    onDidClientDisconnect(()=>{
                        channelServer.dispose()
                        channelClient.dispose()
                        this._connections.delete(connection)
                    })
                })
            })
        }
    }


interface IIPCEvent {
  event: { sender: Electron.WebContents };
  message: Buffer | null;
}

function createScopedOnMessageEvent(
  senderId: number,
  eventName: string,
): Event<VSBuffer | Buffer> {
  const onMessage = Event.fromNodeEventEmitter<IIPCEvent>(
    ipcMain,
    eventName,
    (event, message) => ({ event, message }),
  );
  const onMessageFromSender = Event.filter(
    onMessage,
    ({ event }) => event.sender.id === senderId,
  );
  // @ts-ignore
  return Event.map(onMessageFromSender, ({ message }) =>
    message ? VSBuffer.wrap(message) : message,
  );
}
export class Server extends IPCServer{
    private static readonly Clients:Map<number,IDisposable> = new Map<number,IDisposable>()

    /** 监听客户端初始化时 向 ipc：hello 发送的消息，来表明已建立了连接
     * @private
     * @static
     * @return {*}  {Event<ClientConnectionEvent>}
     * @memberof Server
     */
    private static getOnDidClientConnect():Event<ClientConnectionEvent>{
        // 返回
        const onHello = Event.fromNodeEventEmitter<Electron.WebContents>(
            ipcMain,
            'ipc:hello',
            ({sender})=>sender
        )

        return Event.map(onHello,webContexts =>{
            const {id} = webContexts // webContext的id 表示窗口id
            const client = Server.Clients.get(id)

            if (client) {
                client.dispose()
            }

            const onDidClientReconnect = new Emitter<void>()
            Server.Clients.set(id,toDisposable(()=>onDidClientReconnect.fire()))
            const onMessage = createScopedOnMessageEvent(id,'ipc:message') as Event<VSBuffer>

            const onDidClientDisconnect = Event.any(
                Event.signal( createScopedOnMessageEvent(id,'ipc:disconnect')),
                onDidClientReconnect.event
            )

            // 这里应该写成依赖注入的方式
            const protocol = new Protocol(webContexts,onMessage)

            return {protocol,onDidClientDisconnect}
        })
    }
    constructor(){
        super(Server.getOnDidClientConnect())
    }

}