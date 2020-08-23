import { client } from './database.service';
import { Catagory } from '../types/catagories';

export const create_quiz = (challenger_username: string, challengee_username: string, question_ids: string) => client.query(
    'INSERT INTO quiz (challenger_username, challengee_username) VALUES($1, $2)',
    [challenger_username, challengee_username]
)
    .then(res => console.log(res))
    .catch(e => console.log(e));