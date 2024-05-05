import { describe, expect, test } from "vitest";
import { isValidUUIDFormat } from '.'
import { randomUUID, randomInt } from 'crypto'

describe('Validate uuid', () => {
    test('should be input valid uuid return true', () => {

        const uuid = randomUUID()

        expect(isValidUUIDFormat(uuid)).toBe(true)
    })
    test('should be input invalid uuid return false', () => {

        const uuid = randomInt(10000)

        expect(isValidUUIDFormat(uuid)).toBe(false)
    })
})