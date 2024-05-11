import { describe, test, expect, afterEach, beforeEach } from 'vitest'
import Account from '../../../account/domain/Account';
import { RoomRepositoryNoSql } from '.';
import { MongoDbAdapter } from '../../database/MongoDbAdapter';
import Room from '../../../chat/domain/Room';
import Sender from '../../../chat/domain/Sender';
import Message from '../../../chat/domain/Message';


let mongoDbAdapter: MongoDbAdapter
let repository: RoomRepositoryNoSql
let rooms: Room[]

describe('Account no SQL Repository', () => {

    beforeEach(async function () {
        mongoDbAdapter = new MongoDbAdapter()
        repository = new RoomRepositoryNoSql(mongoDbAdapter)

        const sender = new Sender('sender1', 'Meu Nome', '/pathToCover')
        const sender2 = new Sender('sender2', 'Meu Nome2', '/pathToCover2')

        const sender3 = new Sender('sender1', 'Meu Nome', '/pathToCover')
        const sender4 = new Sender('sender2', 'Meu Nome2', '/pathToCover2')

        const message = Message.create(sender, 'test message')
        const message2 = Message.create(sender, 'test message')
        const message3 = Message.create(sender, 'test message')
        const message4 = Message.create(sender, 'test message')
        const message5 = Message.create(sender, 'test message')

        const room = Room.create('private', [sender, sender2])
        const room2 = Room.create('private', [sender3, sender4])

        rooms = [room, room2]

        await repository.createRoom(room)
        await repository.createRoom(room2)
    })

    test('create() and get() room should be add room and return valid room', async () => {
        const sender = new Sender('my-id', 'Meu Nome', '/pathToCover')
        const sender2 = new Sender('my-id2', 'Meu Nome2', '/pathToCover2')

        const room = Room.create('private', [sender, sender2])

        const message = Message.create(sender, 'test message')

        await repository.createRoom(room)

        const result = await repository.getRoom(room.roomId)

        console.log(result)

        expect(result.roomId).toBe(room.roomId)
        expect(result.roomType).toBe(room.roomType)
        expect(result.members.map((sender) => Object({
            accountId: sender.accountId,
            name: sender.name,
            cover: sender.cover
        }))).toStrictEqual(room.members.map((sender) => sender.getValues()))
    })

    test('update room', async () => {
        const sender = new Sender('my-id', 'Meu Nome', '/pathToCover')
        const message = Message.create(sender, 'novaMessage')

        const room = rooms[0]

        room.pushMessage(message)

        await repository.update(room.roomId, { messages: room.getMessageValues() })

        const result = await repository.getRoom(room.roomId)

        console.log(result)

    })

    // test('create() and get() room should be add room and return valid room', async () => {
    //     const sender = new Sender('my-id', 'Meu Nome', '/pathToCover')
    //     const sender2 = new Sender('my-id2', 'Meu Nome2', '/pathToCover2')

    //     const room = Room.create('private', [sender, sender2])

    //     const message = Message.create(sender, 'test message')

    //     await repository.createRoom(room)

    //     const result = await repository.getRoom(room.roomId)

    //     console.log(result)

    //     expect(result.roomId).toBe(room.roomId)
    //     expect(result.roomType).toBe(room.roomType)
    //     expect(result.members.map((sender) => sender.getValues())).toStrictEqual(room.members.map((sender) => sender.getValues()))
    // })

    afterEach(async function () {
        await mongoDbAdapter.disconnect()

    })
})
