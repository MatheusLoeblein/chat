import { describe, test, expect, afterEach, beforeEach } from 'vitest'
import Account from '../../../account/domain/Account';
import { RoomRepositoryNoSql } from '.';
import { MongoDbAdapter } from '../../database/MongoDbAdapter';
import Room from '../../../chat/domain/Room';
import Sender from '../../../chat/domain/Sender';
import Message from '../../../chat/domain/Message';
import { exec } from 'child_process';


let mongoDbAdapter: MongoDbAdapter
let repository: RoomRepositoryNoSql
let rooms: Room[]

let mainSender: Sender;

describe('Account no SQL Repository', () => {

    beforeEach(async function () {
        mongoDbAdapter = new MongoDbAdapter()
        repository = new RoomRepositoryNoSql(mongoDbAdapter)

        mainSender = new Sender('sender1', 'Meu Nome', '/pathToCover')
        const sender2 = new Sender('sender2', 'Meu Nome2', '/pathToCover2')

        const sender3 = new Sender('sender1', 'Meu Nome', '/pathToCover')
        const sender4 = new Sender('sender2', 'Meu Nome2', '/pathToCover2')

        const message = Message.create(mainSender, 'message')
        const message2 = Message.create(sender2, 'test message2')
        const message3 = Message.create(sender3, 'test message3')
        const message4 = Message.create(sender4, 'test message4')
        const message5 = Message.create(mainSender, 'test message5')

        const room = Room.create('private', [mainSender, sender2])

        room.pushMessage(message)
        room.pushMessage(message2)
        room.pushMessage(message3)
        room.pushMessage(message4)
        room.pushMessage(message5)
        
        const room2 = Room.create('private', [mainSender, sender3, sender4])

        rooms = [room, room2]

        await repository.createRoom(room)
        await repository.createRoom(room2)
    })

    test('create() and get() room should be add room and return valid room', async () => {
        const sender = new Sender('my-id', 'Meu Nome', '/pathToCover')
        const sender2 = new Sender('my-id2', 'Meu Nome2', '/pathToCover2')

        const room = Room.create('private', [sender, sender2])

        await repository.createRoom(room)

        const result = await repository.getRoom(room.roomId)

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

    })

    test('getRoomsByAccount shoud be ordened list rooms per last message', async () => {
        const message = Message.create(mainSender, 'message')
        
        rooms[1].pushMessage(message)

        repository.update(rooms[1].roomId, { messages: rooms[1].getMessageValues() })

        const roomsData = await repository.getRoomsByAccount(mainSender.accountId)

        expect(roomsData[0].roomId).toBe(rooms[1].roomId)
        expect(roomsData[1].roomId).toBe(rooms[0].roomId)
    })

    afterEach(async function () {
        await mongoDbAdapter.disconnect()

    })
})
