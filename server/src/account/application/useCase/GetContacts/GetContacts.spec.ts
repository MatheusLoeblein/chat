import { describe, test, beforeEach, afterEach, expect } from 'vitest'
import Account from '../../../domain/Account';
import { AccountRepositoryInMemory } from '../../../../infra/repository/AccountReposityInMemory';
import Registry from '../../../../DI/registry';
import Sender from '../../../../chat/domain/Sender';

import { GetContacts } from '.';

describe('GetContacts use case', () => {

    let account1: Account;
    let account2: Account;
    let account3: Account;

    beforeEach(async () => {
        account1 = Account.create('JohnDoe', 'John Doe', 'john@example.com', false, 'password123');
        account2 = Account.create('possibleContact', 'John Doe', 'john@example.com', false, 'password123');
        account3 = Account.create('possibleContactTwo', 'John Doe', 'john@example.com', false, 'password123');


        const repository = new AccountRepositoryInMemory()

        Registry.getInstance().provide('accountRepository', repository)

        await repository.save(account1)
        await repository.save(account2)
        await repository.save(account3)

        account1.contacts.addContact(account2.accountId, account2.name.getValue(), account2.cover)
        account1.contacts.addContact(account3.accountId, account3.name.getValue(), account3.cover)

        await repository.update(account1)
    })

    test('GetContacts().execute() should return sender populate list', async () => {
        const getContatcsUseCase = new GetContacts()

        const contacts = await getContatcsUseCase.execute(account1.accountId)

        expect(contacts[0].accountId).toBe(account2.accountId)
        expect(contacts[1].accountId).toBe(account3.accountId)
    })

    test('GetContacts().execute() should return an error if accountId does not return anything', async () => {

        try {
            const getContatcsUseCase = new GetContacts()
            await getContatcsUseCase.execute('Invalid UUID')
            throw new Error('FAIL')
        }
        catch (e) {
            expect(e).toBeInstanceOf(Error)
            expect(e.message).toBe('AccountId invalid')
        }

    })
})