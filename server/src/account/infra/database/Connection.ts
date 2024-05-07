export interface Connection {
    disconnect(): Promise<void>;
}


export interface NoSqlConnection extends Connection {
    find(collection: string, data: any): Promise<any>;
    insert(collection: string, data: any): Promise<any>;
}