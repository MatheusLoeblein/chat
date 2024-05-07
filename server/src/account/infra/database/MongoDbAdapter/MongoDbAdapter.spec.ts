import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { MongoDbAdapter } from '.'


let mongoDbAdapter: MongoDbAdapter

describe('MongoDbAdapter', () => {
    beforeEach(function () {
        mongoDbAdapter = new MongoDbAdapter()
    })

    test('Should be insert and find data in Mongo', async () => {

        const data = { username: 'matheus', isAdmin: true }
        await mongoDbAdapter.insert('collection', data)

        const result = await mongoDbAdapter.find('collection', { ...data })

        expect(result.username).toBe(data.username)
        expect(result.isAdmin).toBe(data.isAdmin)
    })

    afterEach(async function () {
        await mongoDbAdapter.disconnect()
    })
})