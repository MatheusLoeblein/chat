import { inject } from "../../../../DI/inject";
import { AccountRepository } from "../../repository/AccountRepository";

export class GetContacts {
    @inject('accountRepository')
    accountRepository: AccountRepository

    async execute(accountId: string) {

        const account = await this.accountRepository.getById(accountId)

        if (!account) throw new Error('AccountId invalid')

        return account.contacts.getContacts()
    }
}