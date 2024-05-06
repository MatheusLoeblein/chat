import { describe, test, expect } from "vitest";
import { SignUp } from ".";
import { AccountRepositoryInMemory } from "../../../infra/repository/AccountReposityInMemory";

describe('SignUp use case', () => {
    test('', async () => {

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
})