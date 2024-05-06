
import crypto from "crypto";

export interface Password {
    value: string;
    salt: string;
    algorithm: string;
    validate(password: string): boolean;
}

export class PBKDF2Password implements Password {
    algorithm: string;

    private constructor(readonly value: string, readonly salt: string) {
        this.algorithm = "pbkdf2";
    }

    static create(password: string) {
        const salt = crypto.randomBytes(20).toString("hex");
        const value = crypto.pbkdf2Sync(password, salt, 100, 64, "sha512").toString("hex");
        return new PBKDF2Password(value, salt);
    }

    static restore(password: string, salt: string) {
        return new PBKDF2Password(password, salt);
    }

    validate(password: string): boolean {
        const value = crypto.pbkdf2Sync(password, this.salt, 100, 64, "sha512").toString("hex");
        return this.value === value;
    }
}

export class PasswordFactory {
    static create(algorithm: string) {
        if (algorithm === "pbkdf2") return PBKDF2Password;
        throw new Error();
    }
}



