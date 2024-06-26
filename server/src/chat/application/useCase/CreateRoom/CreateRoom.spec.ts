
import { describe, test, expect, beforeEach, afterEach } from 'vitest'

import Account from '../../../../account/domain/Account';
import { AccountRepositoryNoSql } from '../../../../infra/repository/AccountRepositoryNoSql';
import { RoomRepositoryNoSql } from '../../../../infra/repository/RoomRepositoryNoSql';
import { MongoDbAdapter } from '../../../../infra/database/MongoDbAdapter';
import { CreatePrivateRoom } from '.';
import Registry from '../../../../DI/registry';

describe('CreatePrivateRoom Use Case', () => {
    let accounts: Account[] = []
    let accountRepository: AccountRepositoryNoSql;
    let roomRepository: RoomRepositoryNoSql;
    let connection: MongoDbAdapter
    let createPrivateRoomUseCase: CreatePrivateRoom

    beforeEach(async () => {
        const account1 = Account.create('JohnDoe', 'John Doe', 'john@example.com', false, 'password123')
        const account2 = Account.create('JohnDoee', 'John Doe', 'john2@example.com', false, 'password123')
        accounts.push(account1)
        accounts.push(account2)

        connection = new MongoDbAdapter()

        accountRepository = new AccountRepositoryNoSql(connection)
        roomRepository = new RoomRepositoryNoSql(connection)

        Registry.getInstance().provide("accountRepository", accountRepository);
        Registry.getInstance().provide("roomRepository", roomRepository);

        await accountRepository.save(account1)
        await accountRepository.save(account2)

        createPrivateRoomUseCase = new CreatePrivateRoom()
    })

    test('Should be create account private room and return roomId', async () => {
        const room = await createPrivateRoomUseCase.execute(accounts[0].accountId, accounts[1].accountId)

        const currentRoom = await roomRepository.getRoom(room.roomId)

        expect(currentRoom.roomType).toBe('private')
        expect(currentRoom.members[0].accountId).toBe(accounts[0].accountId)
        expect(currentRoom.members[1].accountId).toBe(accounts[1].accountId)
    })

    test('Should be error send invalid first arg', async () => {
        try {
            await createPrivateRoomUseCase.execute('', accounts[1].accountId)
            throw new Error('FAIL')
        }
        catch (e) {
            expect(e.message).toBe('Invalid accountId')
        }
    })

    test('Should be error send invalid second arg', async () => {
        try {
            await createPrivateRoomUseCase.execute(accounts[0].accountId, '')
            throw new Error('FAIL')
        }
        catch (e) {
            expect(e.message).toBe('Invalid accountId')
        }
    })

    afterEach(async () => {
        await connection.disconnect()
    })


})