import { Connection } from "../infra/database/Connection";
import HttpServer from "../infra/http/HttpServer";
import { ControllerManager } from "../infra/http/Controllers";


export class AppManager {
    connection: Connection
    httpServer: HttpServer

    constructor(connection: Connection, httpserver: HttpServer) {
        this.connection = connection
        this.httpServer = httpserver
    }

    async start(port: number) {
        await ControllerManager.getInstance().startRouters()
        this.httpServer.listen(port)
    }

    async close() {
        await this.connection.disconnect()
        this.httpServer.close()
    }
}
