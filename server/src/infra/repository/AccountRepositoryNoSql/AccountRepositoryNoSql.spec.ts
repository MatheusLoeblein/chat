import { describe, test, expect, afterEach, beforeEach } from 'vitest'
import Account from '../../../account/domain/Account';
import { AccountRepositoryNoSql } from '.';
import { MongoDbAdapter } from '../../database/MongoDbAdapter';


let username: string;
let name: string;
let email: string;
let isAdmin: boolean;
let password: string;

let mongoDbAdapter: MongoDbAdapter
let account: Account
let repository: AccountRepositoryNoSql

describe('Account no SQL Repository', () => {

    beforeEach(async function () {
        username = 'JohnDoe';
        name = 'John Doe';
        email = 'john@example.com';
        isAdmin = false;
        password = 'password123';

        mongoDbAdapter = new MongoDbAdapter()
        account = Account.create(username, name, email, isAdmin, password);
        repository = new AccountRepositoryNoSql(mongoDbAdapter)
        await repository.save(account)
    })

    test('getById() Should be add account in account list', async () => {
        const accountData = await repository.getById(account.accountId)


        expect(accountData).toBeInstanceOf(Account)
        expect(accountData.username.getValue()).toBe(username)
        expect(accountData.name.getValue()).toBe(name)
        expect(accountData.email.getValue()).toBe(email)
        expect(accountData.isAdmin).toBe(isAdmin)
    })

    test('getByEmail() Should be return accont existent', async () => {
        const accountData = await repository.getByEmail(email)

        expect(accountData).toBeInstanceOf(Account)
        expect(accountData.username.getValue()).toBe(username)
        expect(accountData.name.getValue()).toBe(name)
        expect(accountData.email.getValue()).toBe(email)
        expect(accountData.isAdmin).toBe(isAdmin)
    })

    test('getByUsername() Should be return accont existent', async () => {
        const accountData = await repository.getByUsername(username)

        expect(accountData).toBeInstanceOf(Account)
        expect(accountData.username.getValue()).toBe(username)
        expect(accountData.name.getValue()).toBe(name)
        expect(accountData.email.getValue()).toBe(email)
        expect(accountData.isAdmin).toBe(isAdmin)
    })

    afterEach(async function () {
        await mongoDbAdapter.disconnect()

    })
})
