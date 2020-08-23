import { client } from './database.service';

export const create_question = (question:string,answer:string,wrong_answers:[string]) => client.query(
    'INSERT INTO questions (text,answer,wrong) VALUES ($1,$2,$3)',
    [question,answer,wrong_answers.toString()]
)

