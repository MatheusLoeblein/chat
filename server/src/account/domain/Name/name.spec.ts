import { test, describe, expect } from "vitest";
import Name from ".";


describe('Name', () => {
    test('Should be create valid name return Name instace', () => {
        const myName = 'John Doe'

        const name = new Name(myName)

        expect(name).toBeInstanceOf(Name)
        expect(name.getValue()).toBe(myName)

    })

    test('Should be create invalid name return error', () => {
        const myName = 'John903841Doe'

        const name = () => {
            new Name(myName)
        }

        expect(name).toThrow(Error)
        expect(name).toThrowError("Invalid name")

    })
})