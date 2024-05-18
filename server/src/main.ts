import { MongoDbAdapter } from './infra/database/MongoDbAdapter';
import ExpressAdapter from './infra/http/ExpressAdapter';
import { ControllerManager } from "./infra/http/Controllers";
import { AccountController } from "./infra/http/Controllers/AccountController";
import { AccountRepositoryNoSql } from "./infra/repository/AccountRepositoryNoSql";
import { SignIn } from './account/application/useCase/SignIn';
import { GetAccount } from './account/application/useCase/GetAccount';
import { SignUp } from './account/application/useCase/SignUp';
import Registry from './DI/registry';
import { createServer } from 'node:http';
import { SocketIoAdpter } from './infra/websocket/SocketIoAdpter';
import { RoomController } from './infra/websocket/controllers/RoomController';
import { GetContacts } from './account/application/useCase/GetContacts';
import { AddContact } from './account/application/useCase/AddContact';

const connection = new MongoDbAdapter();
const accountRepository = new AccountRepositoryNoSql(connection);
const express = new ExpressAdapter();

Registry.getInstance().provide('accountRepository', accountRepository)
Registry.getInstance().provide('httpServer', express)

const getAccount = new GetAccount()
const signUp = new SignUp()
const signIn = new SignIn()
const getContacts = new GetContacts()
const addContact = new AddContact()

Registry.getInstance().provide('getAccount', getAccount)
Registry.getInstance().provide('signUp', signUp)
Registry.getInstance().provide('signIn', signIn)
Registry.getInstance().provide('getContacts', getContacts)
Registry.getInstance().provide('addContact', addContact)

const accountRouter = new AccountController()
const controllerManager = ControllerManager.getInstance()

controllerManager.registerController(accountRouter)
controllerManager.startControllers()

const server = createServer(express.app)

const websocketServer = new SocketIoAdpter(server)

server.listen(7454, () => {
    console.log('Server startado na porta 7454')

    const roomController = new RoomController(websocketServer)
    roomController.init()
})

export { server }