import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { MongoDbAdapter } from '../../../../infra/database/MongoDbAdapter';
import { AppManager } from '../../../../app';
import ExpressAdapter from '../../../../infra/http/ExpressAdapter';
import { Routers } from '../../../../infra/http/Routes';
import { AccountRouter } from '../../../../infra/http/Routes/Router';
import { AccountRepositoryNoSql } from '../../../../infra/repository/AccountRepositoryNoSql';
import axios from 'axios';
import { randomInt } from 'crypto'

import { decode } from 'jsonwebtoken'
import Account from '../../../domain/Account';


describe('SignUp Intergration test', () => {
    let App: AppManager;
    let port: number = 7456
    let account:Account

    beforeEach(async () => {
        port = randomInt(49152, 65535)
        const connection = new MongoDbAdapter();
        const accountRepository = new AccountRepositoryNoSql(connection);
        const httpServer = new ExpressAdapter();

        account = Account.create('Matheus', 'Matheus Eduardo','matheus@ttest.com', true, '123456',)
        await accountRepository.save(account)

        const accountRouter = new AccountRouter(httpServer, accountRepository);
        Routers.registerRouter(accountRouter)

        App = new AppManager(connection, httpServer)
        await App.start(port)
    })

    test('Should return valid token on send crendentials', async () => {
        const response = await axios.post(`http://localhost:${port}/signin/`, {
            username: account.username.getValue(),
            password: '123456'
        })

        const decoded:any = decode(response.data)

        expect(decoded.accountId).toBe(account.accountId)
        expect(decoded).toHaveProperty('iat')
        expect(decoded).toHaveProperty('exp')
        

    })
    

    afterEach(async () => {
        await App.close()
    })
})