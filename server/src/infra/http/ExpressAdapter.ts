import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";
import cors from "cors";
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { JWTService } from "../../services/jsonWebToken";


export default class ExpressAdapter implements HttpServer {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/static', express.static(__dirname + '/../../../public'));
    }

    on(method: string, url: string, callback: Function, privateRoute: boolean): void {
        this.app[method](url, async function (req: Request, res: Response) {
            try {
                if (privateRoute) {
                    JWTService.verify(req.headers.authorization)
                }
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
        this.app.listen(port);
    }

    close(): void {
        this.app.close()
    }


}
