import { FindCursor, MongoClient } from 'mongodb'
import { NoSqlConnection } from '../Connection'
import { DB_NAME, DB_HOST, DB_PORT } from '../../../config/config'


export class MongoDbAdapter implements NoSqlConnection {
    connection: MongoClient;

    constructor() {
        this.connection = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    }

    async insert(collection: string, data: any): Promise<any> {
        const currentCollection = this.getCollection(collection)

        await currentCollection.insertOne(data);
    }

    async find(collection: string, data: any): Promise<any> {
        const currentCollection = this.getCollection(collection)

        const result = await currentCollection.findOne(data);

        return result
    }

    findMany(collection: string, filter: any): FindCursor {
        const currentCollection = this.getCollection(collection)

        const result = currentCollection.find(filter);

        return result
    }


    async update(collection: string, filter: any, data: any): Promise<any> {
        const currentCollection = this.getCollection(collection)

        await currentCollection.updateOne(filter, data)
    }

    async disconnect(): Promise<void> {
        if (process.env.NODE_ENV === 'test') {
            await this.connection.db().dropDatabase()
        }
        await this.connection.close();
    }

    private getCollection(collectionName: string) {
        const db = this.connection.db();
        const collection = db.collection(collectionName);

        return collection
    }
}