import { describe, test, expect, afterEach, beforeEach } from 'vitest'
import Account from '../../../domain/Account';
import { AccountRepositoryNoSql } from '.';
import { MongoDbAdapter } from '../../database/MongoDbAdapter';

let mongoDbAdapter: MongoDbAdapter

describe('Account In Memory Repository', () => {

    beforeEach(function () {
        mongoDbAdapter = new MongoDbAdapter()
    })

    test('save() Should be add account in account list', async () => {

        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const password = 'password123';

        const account = Account.create(username, name, email, isAdmin, password);
        const repository = new AccountRepositoryNoSql(new MongoDbAdapter())

        await repository.save(account)

        const accountData = await repository.getById(account.accountId)
    })

    // test('getByAccountId() Should be return accont existent', async () => {
    //     const username = 'JohnDoe';
    //     const name = 'John Doe';
    //     const email = 'john@example.com';
    //     const isAdmin = false;
    //     const password = 'password123';

    //     const account = Account.create(username, name, email, isAdmin, password);
    //     const repository = new AccountRepositoryNoSql()

    //     repository.save(account)

    //     const getedAccount = await repository.getById(account.accountId)

    //     expect(getedAccount).instanceOf(Account)
    //     expect(getedAccount.username.getValue()).toBe(username)
    //     expect(getedAccount.email.getValue()).toBe(email)
    //     expect(getedAccount.isAdmin).toBe(isAdmin)
    //     expect(getedAccount.name.getValue()).toBe(name)
    //     expect(getedAccount.password.validate(password)).toBe(true)
    // })

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
        await mongoDbAdapter.disconnect('account')
    })
})
