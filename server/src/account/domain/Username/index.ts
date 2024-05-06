export default class Username {
    private value: string;

    constructor(username: string) {
        if (!username.match(/^[a-zA-Z]+$/)) throw new Error("Invalid username");
        this.value = username;
    }

    getValue(): string {
        return this.value;
    }
}