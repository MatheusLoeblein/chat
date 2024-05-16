import HttpServer from "../HttpServer";
import { GetAccount } from "../../../account/application/useCase/GetAccount";
import { Controller } from "./inteface";
import { SignUp } from "../../../account/application/useCase/SignUp";
import { SignIn } from "../../../account/application/useCase/SignIn";
import { inject } from "../../../DI/inject";


export class AccountController implements Controller {
    @inject('signUp')
    signUp?: SignUp
    @inject('signIn')
    signIn?: SignIn
    @inject('getAccount')
    getAccount?: GetAccount
    @inject('httpServer')
    httpServer?: HttpServer

    async init() {

        this.httpServer?.on("post", "/signup", async (params: any, body: any) => {
            const output = this.signUp?.execute(body)
            console.log(body)
            return output;
        }, false);

        this.httpServer?.on("post", "/signin", async (params: any, body: any) => {
            const account = await this.signIn?.execute(body)

            return account;
        }, false);

        this.httpServer?.on("get", "/accounts/:accountId", async (params: any, body: any) => {
            const account = await this.getAccount?.execute(params.accountId)

            return account;
        }, true);
    }
}


