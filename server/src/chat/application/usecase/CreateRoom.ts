import { rootCertificates } from "tls";
import { AccountRepository } from "../../../account/application/repository/AccountRepository";
import { RoomRepository } from "../repository";

export class CreatePrivateRoom {
    constructor(readonly accountRepository: AccountRepository, roomRepository: RoomRepository) { }

    async execute(firstAccountId: string, secondAccountId: string){

        const firstAccount = await this.accountRepository.getById(firstAccountId)
        const secundAccount = await this.accountRepository.getById(secondAccountId)

        this.accountRepository.getById(secondAccountId)

    }
}
