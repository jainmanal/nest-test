import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from "@nestjs/websockets";
  import { Server, Socket } from "socket.io";
  
  @WebSocketGateway(9000, { transports: ["websocket"] })
  export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  { 
    @WebSocketServer()
    server: Server;

    names: Map<string, string> = new Map();
  
    constructor() {}
  
    afterInit(server: Server): any {
      console.log('initialized')
    }
  
    async handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected ${client.id}`);
    }

    async handleDisconnect(socket: Socket) {
      socket.emit('user-disconnected', {user: this.names[socket.id], event: 'left'});
      this.names.delete(socket.id);
    }
  
    @SubscribeMessage('set-name') 
    setnAME(socket: Socket, name: string) {
      if(name){
        this.names[socket.id] = name;
        socket.emit('user-joined', `${name} joined the chatroom!`); 
      }
    }

    @SubscribeMessage('message') 
    addMessage(socket: Socket, message) {
      socket.broadcast.emit('message', {text: message, from: this.names[socket.id], created: new Date()});
      socket.emit('message', {text: message, from: this.names[socket.id], created: new Date()});
    }
  }
