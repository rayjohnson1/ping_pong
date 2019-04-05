import { IDBPool } from './interfaces';
import PostgresDatabase from './pgDatabase';

export default class DatabaseFactory{

    public getPool(): IDBPool {
        return PostgresDatabase.createPool();
    }

}