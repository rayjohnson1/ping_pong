import { IDBPool } from "./Db/interfaces";
import jwt from 'jsonwebtoken';

interface IHashGenerator { 
    hash: (s: string, salt: number) => Promise<string>,
    compare: (s: string, hash: string) => Promise<boolean> 
}

export interface IUser {
    id?: number;
    name?: string,
    username?: string;
    password?: string,
}

export interface ISigninResult {
    token: string,
    user: IUser
}

export default class User {

    public id: number;
    public name: string;
    public username: string;
    public password: string;

    public db: IDBPool;
    public Hasher: IHashGenerator;

    constructor(params: IUser, db: IDBPool, Hasher: IHashGenerator){
        const { id, name, username, password } = params;

        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;

        this.db = db;
        this.Hasher = Hasher;

    }

    public async create(): Promise<ISigninResult>{

        if(await this.usernameExists()) throw 'Sorry, this username is taken.';
        
        this.password = await this.generatePasswordHash(this.password);

        try {

            const { rows } = await this.db.query({
                text: `
                    INSERT INTO
                        users (nick_name, username, password)
                    VALUES
                        ($1, $2, $3)
                    RETURNING *;
                `,
                values: [this.name, this.username, this.password]
            });
    
            return {
                token: jwt.sign({ 
                        userId: rows[0].id,
                    },
                    process.env.JWT_SECRET,
                    {
                        issuer: process.env.JWT_ISS,
                        audience: process.env.JWT_AUD,
                        expiresIn: process.env.JWT_EXP
                    }),
                user: {
                    id: rows[0].id,
                    name: rows[0].nick_name,
                    username: rows[0].username
                }
            }

        } catch(e) {

            throw e;

        }

    }

    public async signin(): Promise<ISigninResult> {

        if(!this.usernameExists()) throw "Username not found.";

        try {

            const userData = await this.db.query({
                text: `
                    SELECT *
                    FROM
                        users
                    WHERE
                        username = $1;
                `,
                values: [this.username]
            });

            const userDataResults = userData.rows[0];

            if(await this.comparePasswordHash(this.password, userDataResults.password)){

                delete userDataResults.password;
                
                return {
                    user: userDataResults,
                    token: jwt.sign({ 
                            userId: userDataResults.id,
                        },
                        process.env.JWT_SECRET,
                        {
                            issuer: process.env.JWT_ISS,
                            audience: process.env.JWT_AUD,
                            expiresIn: process.env.JWT_EXP
                        })
                }

            } else 
                throw "Incorrect username / password combination.";

        } catch(e) {

            throw e;

        }

    }

    private async usernameExists(): Promise<boolean> {

        try {

            const { rowCount } = await this.db.query({
                text: `
                    SELECT
                        id
                    FROM
                        users
                    WHERE
                        username = $1;
                `,
                values: [this.username]
            });
    
            return rowCount === 1;

        } catch(e) {

            throw e;

        }

    }

    private async generatePasswordHash(password: string): Promise<string> {
        return await this.Hasher.hash(password, 10);
    }

    private async comparePasswordHash(userInputPassword: string, dbStoredPassword: string): Promise<boolean> {
        return await this.Hasher.compare(userInputPassword, dbStoredPassword);
    }

}