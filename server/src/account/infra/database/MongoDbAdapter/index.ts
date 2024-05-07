import { MongoClient } from 'mongodb'
import { NoSqlConnection } from '../Connection'

export class MongoDbAdapter implements NoSqlConnection {
    testDB: boolean;
    connection: MongoClient;

    constructor(testDB: boolean) {
        this.testDB = testDB
        this.connection = new MongoClient('mongodb://127.0.0.1:27017/myApp')

    }
    async find(collection: string, data: any): Promise<any> {
        const db = this.connection.db();

        // await db.createIndex('account', { accountId: 1 }, { unique: true });

        const connection = db.collection(collection);

        const result = await connection.findOne(data);

        return result
    }
    async insert(collection: string, data: any): Promise<any> {
        const db = this.connection.db();
        const connection = db.collection(collection);

        await connection.insertOne(data);
    }

    async disconnect(cleanDb = ''): Promise<void> {
        if (this.testDB) {
            const collection = this.connection.db().collection(cleanDb)
            await collection.deleteMany({})

        }
        await this.connection.close();
    }
}