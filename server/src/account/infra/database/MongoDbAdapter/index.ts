import { MongoClient } from 'mongodb'
import { NoSqlConnection } from '../Connection'
import { DB_NAME, DB_HOST, DB_PORT } from '../../../../config/config'


export class MongoDbAdapter implements NoSqlConnection {
    connection: MongoClient;

    constructor() {
        this.connection = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

    }
    async find(collection: string, data: any): Promise<any> {
        const db = this.connection.db();

        const connection = db.collection(collection);

        const result = await connection.findOne(data);

        return result
    }
    async insert(collection: string, data: any): Promise<any> {
        const db = this.connection.db();
        const connection = db.collection(collection);

        await connection.insertOne(data);
    }

    async disconnect(): Promise<void> {

        if (process.env.NODE_ENV === 'test') {
            await this.connection.db().dropDatabase()

        }
        await this.connection.close();
    }
}