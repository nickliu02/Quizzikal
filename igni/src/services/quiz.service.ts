import { client } from './database.service';

export const create_quiz = () => client.query(
    '',
    []
)