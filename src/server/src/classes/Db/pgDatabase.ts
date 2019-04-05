//Interfaces
import { IDBPool } from './interfaces';
import { Pool } from 'pg';

export default class PostgresDatabase {

    private static databaseSingleton: IDBPool = null;
    
    public static createPool(): IDBPool{

        if(this.databaseSingleton !== null)
            return this.databaseSingleton;

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL
        });

        this.databaseSingleton = pool

        return this.databaseSingleton;
    }

}

