export default class Sender {
    accountId: string
    name: string
    cover: string
    constructor(accountId: string, name: string, cover: string) {
        this.accountId = accountId
        this.name = name
        this.cover = cover
    }



    getValues(): SenderValues {
        return {
            accountId: this.accountId,
            name: this.name,
            cover: this.cover
        }
    }
}


interface SenderValues {
    accountId: string
    name: string
    cover: string
}
