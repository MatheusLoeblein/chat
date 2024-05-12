import Room from "../../../chat/domain/Room";
import { RoomRepository } from "../../../chat/application/repository";
import { NoSqlConnection } from "../../database/Connection";

export class RoomRepositoryNoSql implements RoomRepository {

    private connection: NoSqlConnection;

    constructor(connection: NoSqlConnection) {
        this.connection = connection
    }

    async createRoom(room: Room): Promise<void> {
        await this.connection.insert('room', {
            roomId: room.roomId,
            roomType: room.roomType,
            members: room.members.map((admin) => admin.getValues()),
            admins: room.admins.map((admin) => admin.getValues()),
            messages: room.messagens.map((message) => message.getValues()),
        })
    }

    async getRoom(roomId: string): Promise<Room> {
        const result = await this.connection.find('room', {
            roomId: roomId
        })

        if (!result) return

        const room = Room.restore(
            result.roomId,
            result.roomType,
            result.members,
            result.messages,
            result.admins,
        )

        return room
    }

    async getRoomsByAccount(accountId: string): Promise<undefined | Room[]> {
        const rooms =  await this.connection.findMany(
            'room', { 
                members: { $elemMatch: { accountId: accountId } },
            }).sort({ 'messages.date': -1 }).toArray()


        const roomsData: Room[] = rooms.map((roomData: any) => {
            return Room.restore(roomData.roomId, roomData.roomType, roomData.members, roomData.messages, roomData.admins);
        });

        return roomsData
    }

    async update(roomId: string, field: any): Promise<void> {
        await this.connection.update('room', { roomId: roomId }, { $set: field });
    }

    
}

