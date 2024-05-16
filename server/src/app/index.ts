import { createServer } from "http";
import Registry from "../DI/registry";
import { GetAccount } from "../account/application/useCase/GetAccount";
import { SignIn } from "../account/application/useCase/SignIn";
import { SignUp } from "../account/application/useCase/SignUp";
import { MongoDbAdapter } from "../infra/database/MongoDbAdapter";
import { ControllerManager } from "../infra/http/Controllers";
import { AccountController } from "../infra/http/Controllers/AccountController";
import ExpressAdapter from "../infra/http/ExpressAdapter";
import { AccountRepositoryNoSql } from "../infra/repository/AccountRepositoryNoSql";
import { SocketIoAdpter } from "../infra/websocket/SocketIoAdpter";
import { RoomController } from "../infra/websocket/controllers/RoomController";

export class AppTest {
    connection: MongoDbAdapter
    server: any
    websocketServer: any

    constructor() {
        this.connection = new MongoDbAdapter();
        const accountRepository = new AccountRepositoryNoSql(this.connection);
        const express = new ExpressAdapter();

        Registry.getInstance().provide('accountRepository', accountRepository)
        Registry.getInstance().provide('httpServer', express)

        const getAccount = new GetAccount()
        const signUp = new SignUp()
        const signIn = new SignIn()

        Registry.getInstance().provide('getAccount', getAccount)
        Registry.getInstance().provide('signUp', signUp)
        Registry.getInstance().provide('signIn', signIn)

        const accountRouter = new AccountController()
        const controllerManager = ControllerManager.getInstance()

        controllerManager.registerController(accountRouter)
        controllerManager.startControllers()

        this.server = createServer(express.app)

        this.websocketServer = new SocketIoAdpter(this.server)

    }

    async start(port: number) {

        this.server.listen(port, () => {
            console.log(`Server startado na porta ${port}`)

            const roomController = new RoomController(this.websocketServer)
            roomController.init()
        })
    }

    async close() {
        await this.connection.disconnect()
        this.server.close()
    }
}
