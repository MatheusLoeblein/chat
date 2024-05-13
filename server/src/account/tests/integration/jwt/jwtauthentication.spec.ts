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
import { JWTService } from '../../../../services/jsonWebToken';

describe('SignUp Intergration test', () => {
    let App: AppManager;
    let port: number = 7456
    let account:Account
    let token:string

    beforeEach(async () => {
        port = randomInt(49152, 65535)
        const connection = new MongoDbAdapter();
        const accountRepository = new AccountRepositoryNoSql(connection);
        const httpServer = new ExpressAdapter();

        account = Account.create('Matheus', 'Matheus Eduardo','matheus@ttest.com', true, '123456',)
        await accountRepository.save(account)

        token = JWTService.sign({accountId: account.accountId})

        const accountRouter = new AccountRouter(httpServer, accountRepository);
        Routers.registerRouter(accountRouter)

        App = new AppManager(connection, httpServer)
        await App.start(port)
    })

    test('Should return account data in private Route with authentication', async () => {

        const response = await axios.get(`http://localhost:${port}/accounts/${account.accountId}`,
            {headers: {Authorization: token}}
        )

        expect(response.status).toBe(200)
    })
    
    test('Should return authentication error if not send token', async () => {
        try{

            await axios.get(`http://localhost:${port}/accounts/${account.accountId}`)
            throw new Error()
        }
        catch(e){
            console.log(e.response.data.message)
            expect(e.response.data.message).toBe('Invalid token')
        }


    })
    
    test('Should return authentication error if send invalid token', async () => {
        try{

            await axios.get(`http://localhost:${port}/accounts/${account.accountId}`,
            {headers: {Authorization: 'false'}})
            throw new Error()
        }
        catch(e){
            expect(e.response.data.message).toBe('Invalid token')
        }


    })

    test('Should return authentication on token expires', async () => {
        try{
            const date = new Date()
            vi.setSystemTime(`2024-05-${date.getDate() + 2}`)

            await axios.get(`http://localhost:${port}/accounts/${account.accountId}`,
            {headers: {Authorization: token}})
            throw new Error()
        }
        catch(e){
            expect(e.response.data.message).toBe('Invalid token')
        }
    })

    afterEach(async () => {
        await App.close()
    })
})