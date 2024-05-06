import { describe, test, expect } from 'vitest'
import { PBKDF2Password } from '.'

describe('Password PBKDF2 encripted', () => {
    test('create() Should', () => {
        const myPass = '123456'
        const password = PBKDF2Password.create(myPass)

        expect(password).toBeInstanceOf(PBKDF2Password)
        expect(password.validate(myPass)).toBe(true)
    })

    test('restore() Should be retore class from encripted value and salt', () => {
        const myPass = '123456'

        const password = PBKDF2Password.restore(
            '6152b5780f515f5797d63ce69b7b0338e3a2260bab2a15baa24aadcf3d654ca5a21ef3fbb8a43fd80babd8baaea36ce6e1046fa2e3bde53c0544c8b52615b950',
            '52a2371d4e8b4c08259a288eb36d82682eb38c96'
        )

        expect(password).toBeInstanceOf(PBKDF2Password)
        expect(password.validate(myPass)).toBe(true)
    })
})