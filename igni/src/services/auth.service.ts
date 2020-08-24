import { client } from './database.service';
import { jwtKey } from '../config';

const jwt = require('jsonwebtoken');

export const register_user = (username: string, password: string, real_name: string): Promise<string> => client.query(
    'INSERT INTO users(username, password, real_name) VALUES($1, $2, $3) RETURNING username',
    [username, password, real_name]
)
    .then(res => generateToken(res.rows[0].username))
    .catch(e => e);

export const authenticate_user = (username: string, password: string): Promise<string> => client.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password]
)
    .then(res => generateToken(res.rows[0].username))
    .catch(e => e);

export const generateToken = (username: string): string => jwt.sign(
    { username: username },
    jwtKey,
    { expiresIn: "24h" }
);
