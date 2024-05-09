import { describe, test, expect, afterEach, beforeEach } from 'vitest'
import Account from '../../../domain/Account';
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

    // test('getByEmail() Should be return accont existent', async () => {
    //     const username = 'JohnDoe';
    //     const name = 'John Doe';
    //     const email = 'john@example.com';
    //     const isAdmin = false;
    //     const password = 'password123';

    //     const account = Account.create(username, name, email, isAdmin, password);
    //     const repository = new AccountRepositoryNoSql()

    //     repository.save(account)

    //     const getedAccount = await repository.getByEmail(email)

    //     expect(getedAccount).instanceOf(Account)
    //     expect(getedAccount.username.getValue()).toBe(username)
    //     expect(getedAccount.email.getValue()).toBe(email)
    //     expect(getedAccount.isAdmin).toBe(isAdmin)
    //     expect(getedAccount.name.getValue()).toBe(name)
    //     expect(getedAccount.password.validate(password)).toBe(true)
    // })

    // test('getByUsername() Should be return accont existent', async () => {
    //     const username = 'JohnDoe';
    //     const name = 'John Doe';
    //     const email = 'john@example.com';
    //     const isAdmin = false;
    //     const password = 'password123';

    //     const account = Account.create(username, name, email, isAdmin, password);
    //     const repository = new AccountRepositoryNoSql()

    //     repository.save(account)

    //     const getedAccount = await repository.getByUsername(username)

    //     expect(getedAccount).instanceOf(Account)
    //     expect(getedAccount.username.getValue()).toBe(username)
    //     expect(getedAccount.email.getValue()).toBe(email)
    //     expect(getedAccount.isAdmin).toBe(isAdmin)
    //     expect(getedAccount.name.getValue()).toBe(name)
    //     expect(getedAccount.password.validate(password)).toBe(true)
    // })

    afterEach(async function () {
        await mongoDbAdapter.disconnect()

    })
})
