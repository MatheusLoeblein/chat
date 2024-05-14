import { MongoDbAdapter } from './infra/database/MongoDbAdapter';
import ExpressAdapter from './infra/http/ExpressAdapter';
import { ControllerManager } from "./infra/http/Controllers";
import { AccountController } from "./infra/http/Controllers/AccountController";
import { AccountRepositoryNoSql } from "./infra/repository/AccountRepositoryNoSql";
import { AppManager } from './app'
import { SignIn } from './account/application/useCase/SignIn';
import { GetAccount } from './account/application/useCase/GetAccount';
import { SignUp } from './account/application/useCase/SignUp';
import Registry from './DI/registry';

const connection = new MongoDbAdapter();
const accountRepository = new AccountRepositoryNoSql(connection);
const httpServer = new ExpressAdapter();

Registry.getInstance().provide('accountRepository', accountRepository)
Registry.getInstance().provide('httpServer', httpServer)

const getAccount = new GetAccount()
const signUp = new SignUp()
const signIn = new SignIn()

Registry.getInstance().provide('getAccount', getAccount)
Registry.getInstance().provide('signUp', signUp)
Registry.getInstance().provide('signIn', signIn)

const accountRouter = new AccountController();

ControllerManager.getInstance().registerRouter(accountRouter)

const App = new AppManager(connection, httpServer)

App.start(7454)