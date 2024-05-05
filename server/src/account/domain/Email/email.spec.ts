import { describe, test, expect } from 'vitest'
import Email from '.'

describe('Email entitie validate', () => {
    test('shold be create a valid email', () => {
        const myEmail = 'johndoe@gmail.com'
        const email = new Email(myEmail)

        expect(email).toBeInstanceOf(Email)
        expect(email.getValue()).toBe(myEmail)
    })

    test('shold be create a invalid email return error', () => {
        const myEmail = 'johndoe'

        const createInvalidEmail = () => {
            new Email(myEmail); // Email inválido
        };

        expect(createInvalidEmail).toThrow(Error)
        expect(createInvalidEmail).toThrowError("Invalid email")
    })
})