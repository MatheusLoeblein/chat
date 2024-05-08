import HttpServer from "./HttpServer";
import { AccountRepository } from '../../application/repository/AccountRepository'
import { GetAccount } from "../../application/useCase/GetAccount";


export default class Router {

    constructor(readonly httpServer: HttpServer, readonly AccountRepository: AccountRepository) {
    }

    async init() {

        this.httpServer?.on("post", "/signup", async (params: any, body: any) => {
            const output = this.AccountRepository.save(body)
            return output;
        });

        this.httpServer?.on("get", "/accounts/:accountId", async (params: any, body: any) => {

            // const account = await this.AccountRepository.getById(params.accountId)
            const getAccount = new GetAccount(this.AccountRepository)

            const account = getAccount.execute(params.accountId)

            if (!account) return 'Error'

            return account;
        });
    }
}