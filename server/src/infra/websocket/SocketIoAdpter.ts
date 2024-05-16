import { Server, Socket } from "socket.io";
import { WebSocketServer } from "./WebSocketServer";
import { JWTService } from "../../services/jsonWebToken";

export class SocketIoAdpter implements WebSocketServer {
    io: Server

    constructor(httpServer: any) {
        this.io = new Server(httpServer, { cors: { origin: 'http://localhost:3000' } })
    }

    on(event: string, callback: Function): void {
        this.io.on(event, async (socket: Socket) => {
            try {
                // const token = socket.handshake.auth.token;

                // JWTService.verify(token);

                await callback(socket);
            } catch (error: any) {
                // Lidar com erros
                console.error(`[ERROR] Socket ${1} ->`, error.message);
            }
        });
    }

    emit(event: string, callback: Function): void {
        this.io.emit(event, callback)
    }

    listen(port: number): void {
        this.io.listen(port)
    }


    close(): void {
        this.io.close();
    }
}