import Message, { MessageValues } from "../Message";
import Sender, { SenderValues } from "../Sender";


export default class Room {
    private constructor(
        readonly roomId: string,
        readonly roomType: 'private' | 'group',
        public members: Sender[],
        public messagens: Message[],
        public admins: Sender[],
    ) { }

    static create(roomType: 'private' | 'group', members: Sender[], admins: Sender[] = []) {
        const roomId = crypto.randomUUID()

        return new Room(roomId, roomType, members, [], admins)
    }

    static restore(roomId: string, roomType: 'private' | 'group', members: any[], messagens: any[], admins: any[]) {

        const convertedMembers = members.map((user) => new Sender(user.accountId, user.name, user.cover))
        const convertedAdmins = admins.map((user) => new Sender(user.accountId, user.name, user.cover))
        const convertedMessagens = messagens.map(
            (msg) => Message.restore(
                msg.messageId,
                msg.sender.accountId,
                msg.sender.name,
                msg.sender.cover,
                msg.content,
                msg.date
            ))


        return new Room(roomId, roomType, convertedMembers, convertedMessagens, convertedAdmins)
    }

    getMessageValues(): MessageValues[] {
        return this.messagens.map((message) => message.getValues())
    }

    getMembersValues(): SenderValues[]{
        return this.members.map((member) => member.getValues())
    }

    getAdminsValues(): SenderValues[]{
        return this.admins.map((admin) => admin.getValues())
    }

    pushMessage(Message: Message) {
        this.messagens.push(Message)
    }

    getValues():RoomValues {
        return {
            roomId: this.roomId,
            roomType: this.roomType,
        }
    }
}

export interface RoomValues{
    roomId: string;
    roomType: string;
}

