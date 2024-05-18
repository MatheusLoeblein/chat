import HttpServer from "../HttpServer";
import { GetAccount } from "../../../account/application/useCase/GetAccount";
import { Controller } from "./inteface";
import { SignUp } from "../../../account/application/useCase/SignUp";
import { SignIn } from "../../../account/application/useCase/SignIn";
import { inject } from "../../../DI/inject";
import { GetContacts } from "../../../account/application/useCase/GetContacts";
import { AddContact } from "../../../account/application/useCase/AddContact";


export class AccountController implements Controller {
    @inject('signUp')
    signUp?: SignUp
    @inject('signIn')
    signIn?: SignIn
    @inject('getAccount')
    getAccount?: GetAccount
    @inject('getContacts')
    getContacts?: GetContacts
    @inject('addContact')
    addContact?: AddContact
    @inject('httpServer')
    httpServer?: HttpServer

    async init() {

        this.httpServer?.on("post", "/signup", async (params: any, body: any) => {
            const output = this.signUp?.execute(body)

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

        this.httpServer?.on("get", "/contacts", async (params: any, body: any) => {

            const user = params.user

            const contacts = await this.getContacts?.execute(user.accountId)

            return contacts;
        }, true);

        this.httpServer?.on("get", "/contacts/add-contact/:username", async (params: any, body: any) => {

            const user = params.user

            const account = await this.addContact?.execute(user.accountId, params.username)

            return account;
        }, true);
    }
}


