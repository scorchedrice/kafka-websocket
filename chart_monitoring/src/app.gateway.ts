import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

@WebSocketGateway({
  // ws://localhost:3001/chart_monitoring
  namespace: 'chart_monitoring',
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  }
})
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer()
  server : Server

  // 연결되면 동작하는 함수
  handleConnection(socket: Socket): any {
    console.log('on connected called :', socket.id)
  }

  sendKafka(data : any) {
    // kafka라는 이벤트에 data를 보낼게
    this.server.emit('kafka', data)
  }
}