import { inject } from "../../../../DI/inject";
import { AccountRepository } from "../../repository/AccountRepository";

export class AddContact {
    @inject('accountRepository')
    accountRepository: AccountRepository

    async execute(accountId: string, contactUsername: string) {

        const account = await this.accountRepository.getById(accountId)
        const contactAccount = await this.accountRepository.getByUsername(contactUsername)

        if (!account || !contactAccount) {
            throw new Error('Add contact failed')
        }

        const contactExists = account.contacts.getContacts().find(sender => sender.accountId === contactAccount.accountId)

        if (contactExists) {
            throw new Error('Contact already exits in contact list')
        }


        account.contacts.addContact(
            contactAccount.accountId,
            contactAccount.name.getValue(),
            contactAccount.cover
        )

        this.accountRepository.update(account)

    }
}