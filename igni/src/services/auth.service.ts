import { client } from './database.service';

export const register_user = (username: string, password: string) => client.query(
    'INSERT INTO users(username, password) VALUES($1, $2)',
    [username, password]    
)   
    .then(res => console.log(res))
    .catch(e => console.log(e));

export const authenticate_user = (username: string, password: string) => client.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password]
)
    .then(res => console.log(res))
    .catch(e => console.log(e));


// export const get_user_id_from_name = (username: string) => client.query(

// )

// export const get_user_profile = (id: number) => client.query(

// )