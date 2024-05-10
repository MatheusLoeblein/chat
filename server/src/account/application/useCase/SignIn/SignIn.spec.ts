import { describe, test, expect, beforeEach } from 'vitest'
import Account from "../../../domain/Account";
import { AccountRepositoryInMemory } from "../../../../infra/repository/AccountReposityInMemory";
import { SignIn } from '.';
import { decode } from 'jsonwebtoken'


describe('SignIn Use Case', () => {

    let username: string;
    let password: string;
    let signIn: SignIn;
    let account: Account;
    let repository: AccountRepositoryInMemory;

    beforeEach(async () => {
        username = 'JohnDoe';
        password = 'password123';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;

        account = Account.create(username, name, email, isAdmin, password);
        repository = new AccountRepositoryInMemory()

        repository.save(account)

        signIn = new SignIn(repository)
    })
    test('Should by valid token from authentication', async () => {

        const token = await signIn.execute({ username: username, password: password })

        const decoded: any = decode(token)

        expect(decoded.accountId).toBe(account.accountId)

    })
})