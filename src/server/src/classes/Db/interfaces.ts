export interface IDBPool{
    connect(): Promise<IDBClient>;
    query(text: string, values?: string[]): Promise<IDBResponse>;
    query(query: IDBQuery): Promise<IDBResponse>;
}

export interface IDBClient{
    query(text: string, values?: string[]): Promise<IDBResponse>;
    query(query: IDBQuery): Promise<IDBResponse>;
    release(): void;
}

export interface IDBQuery{
    text: string;
    values: any[]
}

export interface IDBResponse{
    rows: any[];
    rowCount: number;
}