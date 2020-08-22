
const {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} = process.env;

const Pool = require('pg').Pool
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: 5432,
});
module.exports=pool;
