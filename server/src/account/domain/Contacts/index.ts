import Sender, { SenderValues } from "../../../chat/domain/Sender";

export default class Contacts {
    private constructor(
        public contacts: Sender[],
        public blockeds: Sender[]
    ) { }

    static create(): Contacts {
        return new Contacts([], [])
    }

    static restore(contacts: any[], blockeds: any[]): Contacts {
        const activelist = contacts.map(
            (sender) => new Sender(
                sender.accountId,
                sender.name,
                sender.cover
            ))

        const blockedlist = blockeds.map(
            (sender) => new Sender(
                sender.accountId,
                sender.name,
                sender.cover
            ))

        return new Contacts(activelist, blockedlist)
    }

    addContact(accountId: string, name: string, cover: string): void {
        this.contacts.push(new Sender(accountId, name, cover))
    }

    removeContact(accountId: string): void {
        this.contacts = this.contacts.filter((sender) => sender.accountId != accountId)
    }

    blockContact(accountId: string, name: string, cover: string): void {
        this.blockeds.push(new Sender(accountId, name, cover))
    }

    removeBlockeContact(accountId: string): void {
        this.blockeds = this.blockeds.filter((sender) => sender.accountId != accountId)
    }

    getContacts(): SenderValues[] {
        return this.contacts.map((sender) => sender.getValues())
    }

    getBlockeds(): SenderValues[] {
        return this.blockeds.map((sender) => sender.getValues())
    }
}