import { test, describe, expect } from "vitest";
import Account from '.';
import { PBKDF2Password } from '../Password';
import Name from '../Name';
import Email from '../Email';
import { randomUUID, randomInt } from 'crypto'
import Username from "../Username";
import Contacts from "../Contacts";
import Sender from "../../../chat/domain/Sender";

describe('Account', () => {
    // Teste para o método create()
    test('create() should create a new Account instance with provided parameters', () => {
        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const password = 'password123';

        const account = Account.create(username, name, email, isAdmin, password);

        expect(account).toBeInstanceOf(Account);
        expect(account.username).toEqual(expect.any(Username));
        expect(account.name).toEqual(expect.any(Name));
        expect(account.email).toEqual(expect.any(Email));
        expect(account.isAdmin).toBe(isAdmin);
        expect(account.password).toEqual(expect.any(PBKDF2Password));
        expect(account.cover).toBe('/static/defaults/userDefault.png')
    });

    // Teste para o método restore()
    test('restore() should restore an Account instance with provided parameters', () => {
        const accountId = randomUUID();
        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const date = new Date();
        const password = 'password123';
        const passwordAlgorithm = 'pbkdf2';
        const salt = 'salt123';
        const contacts = [{
            accountId: randomUUID(),
            name: 'Funlano de tal',
            cover: ''
        }]
        const blockeds = [{
            accountId: randomUUID(),
            name: 'Siclano de tal',
            cover: ''
        }]

        const account = Account.restore(accountId, username, name, email, isAdmin, date, password, passwordAlgorithm, salt, contacts, blockeds, 'cover');

        expect(account).toBeInstanceOf(Account);
        expect(account.accountId).toBe(accountId);
        expect(account.username).toEqual(expect.any(Username));
        expect(account.name).toEqual(expect.any(Name));
        expect(account.email).toEqual(expect.any(Email));
        expect(account.isAdmin).toBe(isAdmin);
        expect(account.date).toBe(date);
        expect(account.password).toEqual(expect.any(PBKDF2Password));
        expect(account.contacts).toBeInstanceOf(Contacts)
        expect(account.contacts.contacts[0]).toBeInstanceOf(Sender)
        expect(account.contacts.blockeds[0]).toBeInstanceOf(Sender)
    });

    test('restore() should return error on input invalid uuid', () => {
        const accountId = `1234`;
        const username = 'JohnDoe';
        const name = 'John Doe';
        const email = 'john@example.com';
        const isAdmin = false;
        const date = new Date();
        const password = 'password123';
        const passwordAlgorithm = 'pbkdf2';
        const salt = 'salt123';
        const contacts = [{
            accountId: randomUUID(),
            name: 'Funlano de tal',
            cover: ''
        }]
        const blockeds = [{
            accountId: randomUUID(),
            name: 'Siclano de tal',
            cover: ''
        }]

        const account = () => Account.restore(accountId, username, name, email, isAdmin, date, password, passwordAlgorithm, salt, contacts, blockeds, 'cover');

        expect(account).toThrow(Error);
        expect(account).toThrowError('UUID not valid!');

    });


});