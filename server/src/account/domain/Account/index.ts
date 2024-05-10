import crypto from "crypto";
import { PBKDF2Password, Password, PasswordFactory } from "../Password";
import Email from "../Email";
import Name from "../Name";
import { isValidUUIDFormat } from '../../utils/isValidUUIDFormat'
import Username from "../Username";

export default class Account {

    private constructor(
        public accountId: string,
        readonly username: Username,
        readonly name: Name,
        readonly email: Email,
        readonly isAdmin: boolean,
        readonly date: Date,
        readonly password: Password,
        readonly cover?: string
    ) {
    }

    static create(username: string, name: string, email: string, isAdmin: boolean, password: string = "", coverInput: string = null) {

        const cover = coverInput ? coverInput : "/static/defaults/userDefault.svg"

        const accountId = crypto.randomUUID();
        const date = new Date();
        return new Account(accountId, new Username(username), new Name(name), new Email(email), isAdmin, date, PBKDF2Password.create(password), cover);
    }

    static restore(accountId: string, username: string, name: string, email: string, isAdmin: boolean, date: Date, password: string, passwordAlgorithm: string, salt: string, cover: string) {

        if (!isValidUUIDFormat(accountId)) {
            throw new Error('UUID not valid!')
        }

        return new Account(accountId, new Username(username), new Name(name), new Email(email), isAdmin, date, PasswordFactory.create(passwordAlgorithm).restore(password, salt), cover);
    }

}