import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";
import cors from "cors";
import { createServer } from 'node:http'
import { Server } from 'socket.io'
// framework and driver
export default class ExpressAdapter implements HttpServer {
    app: any;
    server: any
    io: Server

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/static', express.static(__dirname + '/../../../public'));
        this.server = createServer(this.app)
        this.io = new Server(this.server, { cors: { origin: 'http://localhost:3000' } })
    }

    on(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: Request, res: Response) {
            try {

                const statusCode = req.method === 'POST' ? 201 : 200
                const output = await callback(req.params, req.body);

                res.status(statusCode).json(output);
            } catch (e: any) {
                res.status(422).json({
                    message: e.message
                });
            }
        })
    }

    listen(port: number): void {
        let connectionsCount = 0;

        this.io.on('connection', (socket) => {
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

        this.server.listen(port);
    }

    close(): void {
        this.server.close()
    }


}