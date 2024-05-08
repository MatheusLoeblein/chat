import { MongoDbAdapter } from './account/infra/database/MongoDbAdapter';
import ExpressAdapter from './account/infra/http/ExpressAdapter';
import Router from "./account/infra/http/Routers";
import { AccountRepositoryNoSql } from "./account/infra/repository/AccountRepositoryNoSql";

const connection = new MongoDbAdapter();
const accountRepository = new AccountRepositoryNoSql(connection);

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, accountRepository);
router.init();
httpServer.listen(3000);