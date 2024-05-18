import Account from "../../domain/Account";

export interface AccountRepository {
    save(account: Account): Promise<void>;
    getById(accountId: string): Promise<undefined | Account>;
    getByEmail(email: string): Promise<undefined | Account>;
    getByUsername(username: string): Promise<undefined | Account>;
    update(account: Account): Promise<void>;
}