import { Connection } from "../account/infra/database/Connection";
import HttpServer from "../account/infra/http/HttpServer";
import { Routers } from "../../src/account/infra/http/Routes";


export class AppManager {
    connection: Connection
    httpServer: HttpServer

    constructor(connection: Connection, httpserver: HttpServer) {
        this.connection = connection
        this.httpServer = httpserver
    }

    async start(port: number) {

        await Routers.startRouters()
        this.httpServer.listen(port)
    }

    async close() {
        await this.connection.disconnect()
        this.httpServer.close()

    }
}
