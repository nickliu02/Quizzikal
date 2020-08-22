import { connectionString } from 'config'

const { Client } = require('pg');

const client = new Client({
    connectionString
});

client.connect()
    .then(() => console.log('connected'))
    .error(e => console.log(e));
