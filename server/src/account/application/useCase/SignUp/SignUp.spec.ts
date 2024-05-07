import { describe, test, expect } from "vitest";
import { SignUp } from ".";
import { AccountRepositoryInMemory } from "../../../infra/repository/AccountReposityInMemory";

describe('SignUp use case', () => {
    test('should be account', async () => {

        const input = {
            username: 'JohnDoe',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        }

        const accountRepository = new AccountRepositoryInMemory()

        const signUp = new SignUp(accountRepository)

        const { accountId } = await signUp.execute(input)

        expect(accountId).toBe(accountRepository.accounts[0].accountId)

    })

    test('should be error on input already exists username', async () => {

        const input = {
            username: 'JohnDoe',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        }

        const accountRepository = new AccountRepositoryInMemory()

        const signUp = new SignUp(accountRepository)

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

        const accountRepository = new AccountRepositoryInMemory()

        const signUp = new SignUp(accountRepository)

        await signUp.execute(input)

        const accountTwo = async () => {
            input.username = 'john2'
            await signUp.execute(input)
        }


        await expect(accountTwo).rejects.toThrow(Error)
        await expect(accountTwo).rejects.toThrowError('Email already exists')

    })
})