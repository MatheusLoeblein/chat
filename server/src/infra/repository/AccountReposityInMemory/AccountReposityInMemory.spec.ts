import { describe, test, expect } from 'vitest'
import Account from '../../../account/domain/Account';
import { AccountRepositoryInMemory } from '.';

describe('Account In Memory Repository', () => {
    test('save() Should be add account in account list', async () => {

        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const password = 'password123';

        const account = Account.create(username, name, email, isAdmin, password);
        const repository = new AccountRepositoryInMemory()

        await repository.save(account)

        expect(repository.accounts).toContainEqual(account)
    })

    test('getByAccountId() Should be return accont existent', async () => {
        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const password = 'password123';

        const account = Account.create(username, name, email, isAdmin, password);
        const repository = new AccountRepositoryInMemory()

        repository.save(account)

        const getedAccount = await repository.getById(account.accountId)

        expect(getedAccount).instanceOf(Account)
        expect(getedAccount.username.getValue()).toBe(username)
        expect(getedAccount.email.getValue()).toBe(email)
        expect(getedAccount.isAdmin).toBe(isAdmin)
        expect(getedAccount.name.getValue()).toBe(name)
        expect(getedAccount.password.validate(password)).toBe(true)
    })

    test('getByEmail() Should be return accont existent', async () => {
        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const password = 'password123';

        const account = Account.create(username, name, email, isAdmin, password);
        const repository = new AccountRepositoryInMemory()

        repository.save(account)

        const getedAccount = await repository.getByEmail(email)

        expect(getedAccount).instanceOf(Account)
        expect(getedAccount.username.getValue()).toBe(username)
        expect(getedAccount.email.getValue()).toBe(email)
        expect(getedAccount.isAdmin).toBe(isAdmin)
        expect(getedAccount.name.getValue()).toBe(name)
        expect(getedAccount.password.validate(password)).toBe(true)
    })

    test('getByUsername() Should be return accont existent', async () => {
        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const password = 'password123';

        const account = Account.create(username, name, email, isAdmin, password);
        const repository = new AccountRepositoryInMemory()

        repository.save(account)

        const getedAccount = await repository.getByUsername(username)

        expect(getedAccount).instanceOf(Account)
        expect(getedAccount.username.getValue()).toBe(username)
        expect(getedAccount.email.getValue()).toBe(email)
        expect(getedAccount.isAdmin).toBe(isAdmin)
        expect(getedAccount.name.getValue()).toBe(name)
        expect(getedAccount.password.validate(password)).toBe(true)
    })
})
