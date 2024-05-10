import { MongoDbAdapter } from './infra/database/MongoDbAdapter';
import ExpressAdapter from './infra/http/ExpressAdapter';
import { Routers } from "../src/infra/http/Routes";
import { AccountRouter } from "./infra/http/Routes/Router";
import { AccountRepositoryNoSql } from "./infra/repository/AccountRepositoryNoSql";
import { AppManager } from './app'

const connection = new MongoDbAdapter();
const accountRepository = new AccountRepositoryNoSql(connection);
const httpServer = new ExpressAdapter();
const accountRouter = new AccountRouter(httpServer, accountRepository);

Routers.registerRouter(accountRouter)

const App = new AppManager(connection, httpServer)

App.start(7454)