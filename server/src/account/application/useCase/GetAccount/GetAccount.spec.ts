import { describe, test, expect, beforeEach } from "vitest";
import Account from "../../../domain/Account";
import { AccountRepositoryInMemory } from "../../../../infra/repository/AccountReposityInMemory";
import { GetAccount } from ".";
import { randomUUID } from 'crypto'
import Registry from "../../../../DI/registry";

describe('GetAccount UseCase', () => {
    let account: Account

    beforeEach(async () => {

        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const password = 'password123';

        account = Account.create(username, name, email, isAdmin, password);
        const repository = new AccountRepositoryInMemory()

        Registry.getInstance().provide('accountRepository', repository)

        repository.save(account)

    })

    test('Should return account id if account exists', async () => {
        const getAccount = new GetAccount()

        const accountData = await getAccount.execute(account.accountId)

        expect(accountData.accountId).toBe(account.accountId)
        expect(accountData.username).toBe(account.username.getValue())
        expect(accountData.name).toBe(account.name.getValue())
        expect(accountData.email).toBe(account.email.getValue())
        expect(accountData.isAdmin).toBe(account.isAdmin)

    })

    test('Should be Error("Account not exists")', async () => {

        const getAccount = new GetAccount()

        const accountData = async () => {
            await getAccount.execute(randomUUID())
        }

        await expect(accountData).rejects.toThrow(Error)
        await expect(accountData).rejects.toThrowError('Account not exists')
    })

})
