import { describe, test, expect } from "vitest";
import Account from "../../../domain/Account";
import { AccountRepositoryInMemory } from "../../../infra/repository/AccountReposityInMemory";
import { GetAccount } from ".";

describe('GetAccount UseCase', () => {
    test('', async () => {
        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const password = 'password123';

        const account = Account.create(username, name, email, isAdmin, password);
        const repository = new AccountRepositoryInMemory()

        repository.save(account)

        const getAccount = new GetAccount(repository)

        const accountData = await getAccount.execute(account.accountId)

        expect(accountData.accountId).toBe(account.accountId)
        expect(accountData.username).toBe(account.username.getValue())
        expect(accountData.name).toBe(account.name.getValue())
        expect(accountData.email).toBe(account.email.getValue())
        expect(accountData.isAdmin).toBe(account.isAdmin)

    })
})