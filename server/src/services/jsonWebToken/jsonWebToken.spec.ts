import { describe, expect, test } from 'vitest'
import { JWTService } from '.'
import { decode } from 'jsonwebtoken'


describe('Tests from json web token', () => {

    test('sign() should be token valid and accountId', () => {
        const user = {
            accountId: 'MY-ACCOUNT-ID'
        }

        const token = JWTService.sign(user)
        const decoded: any = decode(token)

        expect(decoded).toHaveProperty('iat')
        expect(decoded).toHaveProperty('accountId')
        expect(decoded.accountId).toBe('MY-ACCOUNT-ID')
    })

    test('sign() should be token valid and accountId', () => {
        const user = {
            accountId: 'MY-ACCOUNT-ID'
        }

        const token = JWTService.sign(user)
        const verify: any = JWTService.verify(token)

        expect(verify).toHaveProperty('iat')
        expect(verify).toHaveProperty('accountId')
        expect(verify.accountId).toBe('MY-ACCOUNT-ID')
    })
})