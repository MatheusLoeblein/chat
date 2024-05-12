import Room from "../../domain/Room";

export interface RoomRepository {
    createRoom(room: Room): Promise<void>;
    getRoom(roomId: string): Promise<undefined | Room>
    getRoomsByAccount(accountId: string): Promise<undefined | Room[]>
    update(roomId: string, field: any): Promise<void>
}