import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { MongoDbAdapter } from '../../../../infra/database/MongoDbAdapter';
import { AppTest } from '../../../../app';
import { AccountRepositoryNoSql } from '../../../../infra/repository/AccountRepositoryNoSql';
import axios from 'axios';
import Account from '../../../domain/Account';
import { JWTService } from '../../../../services/jsonWebToken';

describe('SignUp Intergration test', () => {
    let App: AppTest;
    let port: number = 7456
    let account1: Account
    let account2: Account
    let account3: Account
    let token: string

    beforeAll(async () => {
        const connection = new MongoDbAdapter();
        const accountRepository = new AccountRepositoryNoSql(connection);

        account1 = Account.create('Matheus', 'Matheus Eduardo', 'matheus@ttest.com', true, '123456',)
        account2 = Account.create('MatheusTwo', 'Matheus Eduardo 1', 'matheus@ttest.com', true, '123456',)
        account3 = Account.create('MatheusTree', 'Matheus Eduardo 2', 'matheus@ttest.com', true, '123456',)

        await accountRepository.save(account1)
        await accountRepository.save(account2)
        await accountRepository.save(account3)

        account1.contacts.addContact(account2.accountId, account2.name.getValue(), account2.cover)
        account1.contacts.addContact(account3.accountId, account3.name.getValue(), account3.cover)

        await accountRepository.update(account1)

        token = JWTService.sign({ accountId: account1.accountId, name: account1.name.getValue(), cover: account1.cover })

        App = new AppTest()
        await App.start(port)
    })

    test('Should return account data in private Route with authentication', async () => {

        const response = await axios.get(`http://localhost:${port}/contacts`,
            { headers: { Authorization: token } })


        expect(response.status).toBe(200)
        expect(response.data).toStrictEqual(account1.contacts.getContacts())
    })

    afterAll(async () => {
        await App.close()
    })
})