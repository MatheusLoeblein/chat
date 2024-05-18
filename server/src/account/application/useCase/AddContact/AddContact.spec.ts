import { describe, test, beforeEach, afterEach, expect } from 'vitest'
import Account from '../../../domain/Account';
import { AccountRepositoryInMemory } from '../../../../infra/repository/AccountReposityInMemory';
import Registry from '../../../../DI/registry';
import Sender from '../../../../chat/domain/Sender';
import { AddContact } from '.';

describe('AddContact use case', () => {

    let account1: Account;
    let account2: Account;
    let account3: Account;
    let repository: AccountRepositoryInMemory

    beforeEach(async () => {
        account1 = Account.create('JohnDoe', 'John Doe', 'john@example.com', false, 'password123');
        account2 = Account.create('possibleContact', 'John Doe', 'john@example.com', false, 'password123');
        account3 = Account.create('possibleContactTwo', 'John Doe', 'john@example.com', false, 'password123');


        repository = new AccountRepositoryInMemory()

        Registry.getInstance().provide('accountRepository', repository)

        await repository.save(account1)
        await repository.save(account2)
        await repository.save(account3)

        account1.contacts.addContact(account2.accountId, account2.name.getValue(), account2.cover)

        // await repository.update(account1.accountId, { "contactList.contacts": account2.contacts.getContacts() })

        await repository.update(account1)
    })

    test('AddContact().execute() should add account2 sender obj in account1 contacts', async () => {
        const addContactUseCase = new AddContact()

        const added = await addContactUseCase.execute(account1.accountId, account3.username.getValue())

        const contacts = account1.contacts.getContacts()

        const account3Sender = contacts.find(sender => sender.accountId === account3.accountId)

        expect(account3Sender.accountId).toBe(account3.accountId)
    })

    test('add duplicate contact should be error', async () => {
        const addContactUseCase = new AddContact()

        try {

            await addContactUseCase.execute(account1.accountId, account2.username.getValue())
            throw new Error('FAIL')
        }

        catch (e) {
            expect(e).toBeInstanceOf(Error)
            expect(e.message).toBe('Contact already exits in contact list')
        }
    })

    test('AddContact().execute() should return an error if accountId does not return anything', async () => {

        try {
            const addContactUseCase = new AddContact()
            await addContactUseCase.execute('Invalid UUID', account3.username.getValue())
            throw new Error('FAIL')
        }
        catch (e) {
            expect(e).toBeInstanceOf(Error)
            expect(e.message).toBe('Add contact failed')
        }

    })

    test('AddContact().execute() should return an error if username does not return anything', async () => {

        try {
            const addContactUseCase = new AddContact()
            await addContactUseCase.execute(account3.accountId, 'invalid Username 123')
            throw new Error('FAIL')
        }
        catch (e) {
            expect(e).toBeInstanceOf(Error)
            expect(e.message).toBe('Add contact failed')
        }

    })
})