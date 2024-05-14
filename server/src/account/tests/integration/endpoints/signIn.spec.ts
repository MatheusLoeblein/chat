import { describe, test, expect, afterAll, beforeAll } from 'vitest'
import { MongoDbAdapter } from '../../../../infra/database/MongoDbAdapter';
import { AppManager } from '../../../../app';
import ExpressAdapter from '../../../../infra/http/ExpressAdapter';
import { ControllerManager, Routers } from '../../../../infra/http/Controllers';
import { AccountController, AccountRouter } from '../../../../infra/http/Controllers/AccountController';
import { AccountRepositoryNoSql } from '../../../../infra/repository/AccountRepositoryNoSql';
import axios from 'axios';
import { randomInt } from 'crypto'

import { decode } from 'jsonwebtoken'
import Account from '../../../domain/Account';
import Registry from '../../../../DI/registry';
import { SignIn } from '../../../application/useCase/SignIn';


describe('SignUp Intergration test', () => {
    let App: AppManager;
    let port: number = 7456
    let account:Account

    beforeAll(async () => {
        const connection = new MongoDbAdapter();
        const accountRepository = new AccountRepositoryNoSql(connection);
        const httpServer = new ExpressAdapter();

        account = Account.create('Matheus', 'Matheus Eduardo','matheus@ttest.com', true, '123456',)
        await accountRepository.save(account)

        const signIn = new SignIn()

        Registry.getInstance().provide('accountRepository', accountRepository)
        Registry.getInstance().provide('signIn', signIn)
        Registry.getInstance().provide('httpServer', httpServer)

        const accountController = new AccountController();
        
        ControllerManager.getInstance().registerRouter(accountController)

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
    
    afterAll(async () => {
        await App.close()
    })
})