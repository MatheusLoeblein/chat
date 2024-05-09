import { MongoDbAdapter } from './account/infra/database/MongoDbAdapter';
import ExpressAdapter from './account/infra/http/ExpressAdapter';
import { Routers } from "../src/account/infra/http/Routes";
import { AccountRouter } from "./account/infra/http/Routes/Router";
import { AccountRepositoryNoSql } from "./account/infra/repository/AccountRepositoryNoSql";
import { AppManager } from './app'

const connection = new MongoDbAdapter();
const accountRepository = new AccountRepositoryNoSql(connection);
const httpServer = new ExpressAdapter();
const accountRouter = new AccountRouter(httpServer, accountRepository);

Routers.registerRouter(accountRouter)

const App = new AppManager(connection, httpServer)

App.start(7454)