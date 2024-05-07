import { AccountRepository } from '../../../application/repository/AccountRepository'
import Account from '../../../domain/Account'
import { NoSqlConnection } from '../../database/Connection'

export class AccountRepositoryNoSql implements AccountRepository {
    constructor(readonly connection: NoSqlConnection) { }

    async save(account: Account): Promise<void> {
        await this.connection.insert('account', {
            accountId: account.accountId,
            username: account.username.getValue(),
            name: account.name.getValue(),
            email: account.email.getValue(),
            isAdmin: account.isAdmin,
            date: account.date,
            password: account.password.value,
            password_salt: account.password.salt,
            password_algorithm: account.password.algorithm,
        })
    }
    async getById(accountId: string): Promise<undefined | Account> {
        const account = await this.connection.find('account', { accountId: accountId })
        console.log(account)

        if (!account) return

        return Account.restore(
            account.accountId,
            account.username,
            account.name,
            account.email,
            account.isAdmin,
            account.date,
            account.password,
            account.password_algorithm,
            account.password_salt,
        )
    }

    async getByEmail(email: string): Promise<undefined | Account> {
        const account = await this.connection.find('account', { email: email })
        if (!account) return

        return Account.restore(
            account.accountId,
            account.username,
            account.name,
            account.email,
            account.isAdmin,
            account.date,
            account.password,
            account.password_algorithm,
            account.password_salt,
        )
    }

    async getByUsername(username: string): Promise<undefined | Account> {
        const account = await this.connection.find('account', { username: username })
        if (!account) return

        return Account.restore(
            account.accountId,
            account.username,
            account.name,
            account.email,
            account.isAdmin,
            account.date,
            account.password,
            account.password_algorithm,
            account.password_salt,
        )
    }

}