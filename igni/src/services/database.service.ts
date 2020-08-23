import { Client } from 'pg';
import { connectionString } from 'config';

export const client = new Client({
    connectionString
});

client.connect()
    .then(() => console.log('connected to db'))
    .catch(e => console.log(e));