import { fileURLToPath } from 'url';
import { AccountRepository } from '../../../account/application/repository/AccountRepository'
import Account from '../../../account/domain/Account';

export class AccountRepositoryInMemory implements AccountRepository {
    accounts: Account[] = []

    async save(account: Account): Promise<void> {
        this.accounts.push(account)
    }
    async getById(accountId: string): Promise<undefined | Account> {
        const account = this.accounts.find((account: any) => account.accountId === accountId)

        if (!account) return

        return account
    }
    async getByEmail(email: string): Promise<undefined | Account> {
        const account = this.accounts.find((account: Account) => account.email.getValue() === email)

        if (!account) return

        return account
    }

    async getByUsername(username: string): Promise<Account> {
        const account = this.accounts.find((account: Account) => account.username.getValue() === username)

        if (!account) return

        return account
    }

    async update(account: Account): Promise<void> {
        const accountIndex = this.accounts.findIndex(account => account.accountId === account.accountId);

        if (accountIndex === -1) {
            throw new Error('Account not found');
        }

        this.accounts[accountIndex] = account;
    }

}