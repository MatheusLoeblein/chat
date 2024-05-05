import { test, describe, expect } from "vitest";
import Username from ".";


describe('Username', () => {
    test('Should be create valid username return Name instace', () => {
        const myName = 'Johndoe'

        const name = new Username(myName)

        expect(name).toBeInstanceOf(Username)
        expect(name.getValue()).toBe(myName)
    })

    test('Should be create invalid username return error', () => {
        const myName = 'John Doe'

        const name = () => {
            new Username(myName)
        }

        expect(name).toThrow(Error)
        expect(name).toThrowError("Invalid username")
    })
})