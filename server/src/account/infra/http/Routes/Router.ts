import HttpServer from "../HttpServer";
import { AccountRepository } from '../../../application/repository/AccountRepository'
import { GetAccount } from "../../../application/useCase/GetAccount";
import { Router } from "./inteface";
import { SignUp } from "../../../application/useCase/SignUp";


export class AccountRouter implements Router {

    constructor(readonly httpServer: HttpServer, readonly AccountRepository: AccountRepository) {
    }

    async init() {


        this.httpServer?.on("post", "/signup", async (params: any, body: any) => {
            const signUp = new SignUp(this.AccountRepository)
            const output = signUp.execute(body)
            return output;
        });

        this.httpServer?.on("get", "/accounts/:accountId", async (params: any, body: any) => {

            const getAccount = new GetAccount(this.AccountRepository)
            const account = await getAccount.execute(params.accountId)

            return account;
        });
    }
}


