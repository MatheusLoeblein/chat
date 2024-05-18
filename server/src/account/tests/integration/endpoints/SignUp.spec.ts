import { describe, test, expect, beforeEach, afterEach, afterAll } from 'vitest'
import { MongoDbAdapter } from '../../../../infra/database/MongoDbAdapter';
import { AppTest } from '../../../../app';
import ExpressAdapter from '../../../../infra/http/ExpressAdapter';
import { ControllerManager } from '../../../../infra/http/Controllers';
import { AccountController } from '../../../../infra/http/Controllers/AccountController';
import { AccountRepositoryNoSql } from '../../../../infra/repository/AccountRepositoryNoSql';
import axios from 'axios';
import { randomInt } from 'crypto'

import { decode } from 'jsonwebtoken'
import Registry from '../../../../DI/registry';
import { SignUp } from '../../../application/useCase/SignUp';

describe('SignUp Intergration test', () => {
    let App: AppTest;
    let port: number = 7456

    beforeEach(async () => {
        port = randomInt(7456, 7556)

        App = new AppTest()
        await App.start(port)
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
        await App.close()

    })
})