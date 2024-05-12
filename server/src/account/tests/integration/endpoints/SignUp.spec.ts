import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { MongoDbAdapter } from '../../../../infra/database/MongoDbAdapter';
import { AppManager } from '../../../../app';
import ExpressAdapter from '../../../../infra/http/ExpressAdapter';
import { Routers } from '../../../../infra/http/Routes';
import { AccountRouter } from '../../../../infra/http/Routes/Router';
import { AccountRepositoryNoSql } from '../../../../infra/repository/AccountRepositoryNoSql';
import axios from 'axios';
import { randomInt } from 'crypto'

import { decode } from 'jsonwebtoken'

describe('SignUp Intergration test', () => {
    let App: AppManager;
    let port: number = 7456

    beforeEach(async () => {
        port = randomInt(49152, 65535)
        const connection = new MongoDbAdapter();
        const accountRepository = new AccountRepositoryNoSql(connection);
        const httpServer = new ExpressAdapter();
        const accountRouter = new AccountRouter(httpServer, accountRepository);
        Routers.registerRouter(accountRouter)
        App = new AppManager(connection, httpServer)
        App.start(port)
    })

    test('Should be account id on send full data', async () => {

        const data = {
            username: 'Matheus',
            name: 'Matheus Eduardo',
            email: 'matheus@ttest.com',
            password: '123456',
        }
        const response = await axios.post(`http://localhost:${port}/signup/`, data)
        const decoded = decode(response.data)

        expect(response.status).toBe(201)
        expect(decoded).toHaveProperty('accountId')
    })

    test('Should be account id on send data on empty username', async () => {

        const data = {
            username: '',
            name: 'Matheus Eduardo asdasd',
            email: 'matheus@ttest3.com2',
            password: '123456',
        }

        try {

            await axios.post(`http://localhost:${port}/signup/`, data)
            throw new Error('Fail test')
        }
        catch (e) {
            expect(e.response.status).toBe(422)
            expect(e.response.data.message).toBe('Invalid username')
        }
    })

    test('Should be account id on send data on empty name', async () => {

        const data = {
            username: 'Matheus',
            name: '',
            email: 'matheus@ttest3.com2',
            password: '123456',
        }

        try {

            await axios.post(`http://localhost:${port}/signup/`, data)
            throw new Error('Fail')
        }
        catch (e) {
            expect(e.response.status).toBe(422)
            expect(e.response.data.message).toBe('Invalid name')
        }

    })

    test('Should be account id on send data on empty email', async () => {

        const data = {
            username: 'Matheus',
            name: 'Matheus Eduardo',
            email: 'matheus',
            password: '123456',
        }

        try {

            await axios.post(`http://localhost:${port}/signup/`, data)
            throw new Error('Fail')
        }
        catch (e) {
            expect(e.response.status).toBe(422)
            expect(e.response.data.message).toBe('Invalid email')
        }

    })

    test('Should be account id on send data on empty password', async () => {

        const data = {
            username: 'Matheus',
            name: 'Matheus Eduardo',
            email: 'matheus@nmatheus.com',
            password: '',
        }

        try {

            await axios.post(`http://localhost:${port}/signup/`, data)
            throw new Error('Fail')
        }
        catch (e) {
            expect(e.response.status).toBe(422)
            expect(e.response.data.message).toBe('Invalid password')
        }

    })

    afterEach(async () => {
        App.close()
    })
})