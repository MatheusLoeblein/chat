import { AccountRepository } from '../../repository/AccountRepository'

export class GetAccount {

    constructor(readonly accountRepository: AccountRepository) { }

    async execute(accountId: string): Promise<AccountData> {
        const account = await this.accountRepository.getById(accountId)
        if (!account) throw new Error('Account not exists')

        return {
            accountId: account.accountId,
            username: account.username.getValue(),
            name: account.name.getValue(),
            email: account.email.getValue(),
            isAdmin: account.isAdmin
        }
    }
}


interface AccountData {
    accountId: string;
    username: string;
    name: string;
    email: string;
    isAdmin: boolean;
}