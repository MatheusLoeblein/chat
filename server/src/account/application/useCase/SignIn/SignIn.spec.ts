import { describe, test, expect, beforeEach } from 'vitest'
import Account from "../../../domain/Account";
import { AccountRepositoryInMemory } from "../../../../infra/repository/AccountReposityInMemory";
import { SignIn } from '.';
import { decode } from 'jsonwebtoken'
import Registry from '../../../../DI/registry';


describe('SignIn Use Case', () => {

    let username: string;
    let password: string;
    let signIn: SignIn;
    let account: Account;
    let accountRepository: AccountRepositoryInMemory;

    beforeEach(async () => {
        username = 'JohnDoe';
        password = 'password123';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;

        account = Account.create(username, name, email, isAdmin, password);
        accountRepository = new AccountRepositoryInMemory()

        accountRepository.save(account)

        Registry.getInstance().provide('accountRepository', accountRepository)
        signIn = new SignIn()
    })

    test('Should be valid token from authentication', async () => {

        const token = await signIn.execute({ username: username, password: password })

        const decoded: any = decode(token)

        expect(decoded.accountId).toBe(account.accountId)

    })

    test('Should be Error() on send invalid credentials  ', async () => {
        try {
            await signIn.execute({ username: 'invalid', password: 'invalid' })
            throw new Error('')
        }

        catch(e){
            expect(e.message).toBe('Credentials Invalid')
        }
    })

    test('Should be Error() on send invalid password  ', async () => {
        try {
            await signIn.execute({ username: username, password: 'invalid' })
            throw new Error('')
        }

        catch(e){
            expect(e.message).toBe('Credentials Invalid')
        }
    })

    test('Should be Error() on enpty account data ', async () => {
        try {
            //@ts-ignore
            await signIn.execute()
            throw new Error('')
        }

        catch(e){
            expect(e.message).toBe('Credentials Invalid')
        }
    })


})