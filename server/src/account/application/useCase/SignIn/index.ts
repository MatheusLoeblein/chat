import { AccountRepository } from "../../repository/AccountRepository";
import { JWTService } from '../../../../services/jsonWebToken'

export class SignIn {
    constructor(readonly accountRepository: AccountRepository) { }

    async execute(credentials: Credentials) {
        if (!credentials) throw new Error('Credentials Invalid')

        const account = await this.accountRepository.getByUsername(credentials.username)

        if (!account) throw new Error('Credentials Invalid')

        if (!account.password.validate(credentials.password)) throw new Error('Credentials Invalid')

        return JWTService.sign({ accountId: account.accountId })
    }
}

interface Credentials {
    username: string;
    password: string;
}