import { WebSocketServer } from "../WebSocketServer";

export class RoomController {
    webSocketServer: WebSocketServer

    constructor(webSocketServer: WebSocketServer) {
        this.webSocketServer = webSocketServer
    }

    async init (){
        let connectionsCount = 0;
        this.webSocketServer.on('connection', (socket) => {
            connectionsCount++;
            console.log('Nova conexão! Total de conexões:', connectionsCount);
    
            socket.on('event', (event) => {
                console.log('EVENTO ->', event)
                this.webSocketServer.emit('event', event)
            })
    
            socket.on('disconnect', () => {
                connectionsCount--;
                console.log('Conexão perdida! Total de conexões:', connectionsCount);
            });
            
        });
    }
}