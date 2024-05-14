import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { MongoDbAdapter } from '../../../../infra/database/MongoDbAdapter';
import { AppManager } from '../../../../app';
import ExpressAdapter from '../../../../infra/http/ExpressAdapter';
import { ControllerManager } from '../../../../infra/http/Controllers';
import { AccountController } from '../../../../infra/http/Controllers/AccountController';
import { AccountRepositoryNoSql } from '../../../../infra/repository/AccountRepositoryNoSql';
import axios from 'axios';
import { randomInt } from 'crypto'

import { decode } from 'jsonwebtoken'
import Account from '../../../domain/Account';
import { JWTService } from '../../../../services/jsonWebToken';
import Registry from '../../../../DI/registry';
import { SignUp } from '../../../application/useCase/SignUp';
import { GetAccount } from '../../../application/useCase/GetAccount';

describe('SignUp Intergration test', () => {
    let App: AppManager;
    let port: number = 7456
    let account:Account
    let token:string

    beforeAll(async () => {
        const connection = new MongoDbAdapter();
        const accountRepository = new AccountRepositoryNoSql(connection);
        const httpServer = new ExpressAdapter();
        const getAccount = new GetAccount()

        account = Account.create('Matheus', 'Matheus Eduardo','matheus@ttest.com', true, '123456',)
        await accountRepository.save(account)

        token = JWTService.sign({accountId: account.accountId})

        Registry.getInstance().provide('accountRepository', accountRepository)
        Registry.getInstance().provide('getAccount', getAccount)
        Registry.getInstance().provide('httpServer', httpServer)

        const accountController = new AccountController();

        ControllerManager.getInstance().registerRouter(accountController)

        App = new AppManager(connection, httpServer)
        await App.start(port)
    })

    test('Should return account data in private Route with authentication', async () => {
        try{

            const response = await axios.get(`http://localhost:${port}/accounts/${account.accountId}`,
            {headers: {Authorization: token}}
        )
        
            expect(response.status).toBe(200)
        }
        catch(e){
            console.log(e)
        }
    })

    afterAll(async () => {
        await App.close()
    })
})