import { AccountRepository } from "../../../../account/application/repository/AccountRepository";
import { RoomRepository } from "../../repository";
import { inject } from "../../../../DI/inject";


export class ListRooms {
    @inject('AccountRepository')
    accountRepository?: AccountRepository
    @inject('RoomRepository')
    roomRepository?: RoomRepository

    // constructor(readonly accountRepository: AccountRepository, readonly roomRepository: RoomRepository) { }

    async execute(accountId: string) {

        const account = await this.accountRepository?.getById(accountId)

        if (!account) throw new Error('AccountId invalid')

        const rooms = await this.roomRepository?.getRoomsByAccount(account.accountId)

        const roomSerializer = rooms.map(
            room => {
                const infos = room.members.find(member => member.accountId != accountId)

                return Object({
                    roomName: room.roomType === 'private' && infos.name,
                    roomImage: room.roomType === 'private' && infos.cover,
                    ...room.getValues()
                })
            }
        )

        return roomSerializer
    }
}
