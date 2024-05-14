import { inject } from "../../../../DI/inject";
import { AccountRepository } from "../../../../account/application/repository/AccountRepository";
import Room from "../../../domain/Room";
import Sender from "../../../domain/Sender";
import { RoomRepository } from "../../repository";

export class CreatePrivateRoom {
    @inject('accountRepository')
    accountRepository?: AccountRepository
    @inject('roomRepository')
    roomRepository?: RoomRepository

    async execute(firstAccountId: string, secondAccountId: string) {

        const firstAccount = await this.accountRepository?.getById(firstAccountId)
        if (!firstAccount) throw new Error('First acccountId invalid')

        const secundAccount = await this.accountRepository?.getById(secondAccountId)
        if (!secundAccount) throw new Error('Second acccountId invalid')

        const room = Room.create('private', [
            new Sender(firstAccount.accountId, firstAccount.name.getValue(), firstAccount.cover),
            new Sender(secundAccount.accountId, secundAccount.name.getValue(), secundAccount.cover)
        ])

        await this.roomRepository.createRoom(room)

        return { roomId: room.roomId }
    }
}
