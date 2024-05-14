import { describe, test, expect, beforeEach } from "vitest";
import { SignUp } from ".";
import { AccountRepositoryInMemory } from "../../../../infra/repository/AccountReposityInMemory";
import { decode } from 'jsonwebtoken'
import Registry from "../../../../DI/registry";



describe('SignUp use case', () => {
    let accountRepository: AccountRepositoryInMemory;

    beforeEach(async () => {

        accountRepository = new AccountRepositoryInMemory()
        Registry.getInstance().provide('accountRepository', accountRepository)
    })

    test('should be account', async () => {

        const input = {
            username: 'JohnDoe',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        }


        const signUp = new SignUp()

        const jwt = await signUp.execute(input)

        const decoded: any = decode(jwt)

        expect(decoded.accountId).toBe(accountRepository.accounts[0].accountId)

    })

    test('should be error on input already exists username', async () => {

        const input = {
            username: 'JohnDoe',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        }



        const signUp = new SignUp()

        await signUp.execute(input)

        const accountTwo = async () => {
            input.email = 'john2@example.com'
            await signUp.execute(input)
        }


        await expect(accountTwo).rejects.toThrow(Error)
        await expect(accountTwo).rejects.toThrowError('Username already exists')

    })

    test('should be error on input already exists email', async () => {

        const input = {
            username: 'JohnDoe',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        }

        const signUp = new SignUp()
        await signUp.execute(input)

        const accountTwo = async () => {
            input.username = 'john2'
            await signUp.execute(input)
        }


        await expect(accountTwo).rejects.toThrow(Error)
        await expect(accountTwo).rejects.toThrowError('Email already exists')

    })
})