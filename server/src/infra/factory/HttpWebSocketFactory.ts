import { createServer } from "node:http";
import ExpressAdapter from "../http/ExpressAdapter";
import { SocketIoAdpter } from "../websocket/SocketIoAdpter";

export function ExpressSocketIoFactory() {

    const expressAdapter = new ExpressAdapter()
    const httpServer = createServer(expressAdapter.app)
    const socketIoAdpter = new SocketIoAdpter(httpServer)

    let connectionsCount = 0;

    socketIoAdpter.on('connection', (socket) => {
        connectionsCount++;
        console.log('Nova conexão! Total de conexões:', connectionsCount);

        socket.on('event', (event) => {
            console.log('EVENTO ->', event)
            this.io.emit('event', event)
        })

        socket.on('disconnect', () => {
            connectionsCount--;
            console.log('Conexão perdida! Total de conexões:', connectionsCount);
        });
    });

    return expressAdapter
}


