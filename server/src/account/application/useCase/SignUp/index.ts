import Account from "../../../domain/Account";
import { AccountRepository } from "../../repository/AccountRepository";

export class SignUp {
    constructor(readonly accountRepository: AccountRepository) { }

    async execute(accountInput: AccountInput): Promise<{ accountId: string }> {

        const existingUsername = await this.accountRepository.getByUsername(accountInput.username)
        const existingEmail = await this.accountRepository.getByEmail(accountInput.email)

        if (existingUsername) throw new Error('Username already exists')

        if (existingEmail) throw new Error('Email already exists')

        const account = Account.create(
            accountInput.username,
            accountInput.name,
            accountInput.email,
            false,
            accountInput.password

        )
        await this.accountRepository.save(account)

        return { accountId: account.accountId }
    }
}

interface AccountInput {
    username: string,
    name: string,
    email: string,
    password: string
}