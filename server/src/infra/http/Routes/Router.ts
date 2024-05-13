import HttpServer from "../HttpServer";
import { AccountRepository } from '../../../account/application/repository/AccountRepository'
import { GetAccount } from "../../../account/application/useCase/GetAccount";
import { Router } from "./inteface";
import { SignUp } from "../../../account/application/useCase/SignUp";
import { SignIn } from "../../../account/application/useCase/SignIn";


export class AccountRouter implements Router {

    constructor(readonly httpServer: HttpServer, readonly AccountRepository: AccountRepository) {
    }

    async init() {

        this.httpServer?.on("post", "/signup", async (params: any, body: any) => {
            const signUp = new SignUp(this.AccountRepository)
            const output = signUp.execute(body)
            return output;
        }, false);

        this.httpServer?.on("post", "/signin", async (params: any, body: any) => {
            const usecase = new SignIn(this.AccountRepository)
            const account = await usecase.execute(body)

            return account;
        }, false);

        this.httpServer?.on("get", "/accounts/:accountId", async (params: any, body: any) => {
            const getAccount = new GetAccount(this.AccountRepository)
            const account = await getAccount.execute(params.accountId)

            return account;
        }, true);
    }
}


