import Sender from "../Sender";

export default class Message {
    private constructor(
        readonly messageId: string,
        readonly sender: Sender,
        public content: string,
        public date: Date

    ) { }

    static create(sender: Sender, content: string) {
        const messageId = crypto.randomUUID()
        const date = new Date()
        return new Message(messageId, sender, content, date)
    }

    static restore(messageId: string, senderId: string, senderName: string, senderCover: string, content: string, date: Date) {


        return new Message(messageId, new Sender(senderId, senderName, senderCover), content, date)
    }
}