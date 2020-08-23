import { client } from './database.service';

export const get_profile = (username: string) => client.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
)
    .then(res => console.log(res))
    .catch(e => console.log(e));