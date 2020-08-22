import { connectionString } from 'config'

const { Client } = require('pg');

export const client = new Client({
    connectionString
});

client.connect()
    .then(() => console.log('connected'))
    .error(e => console.log(e));

