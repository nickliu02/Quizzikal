import { client } from './database.service';
import { Catagory } from '../types/catagories';
import { quizRouter } from '../routes/quiz.router';

export const create_quiz = (challenger_username: string, challengee_username: string, question_ids: string, catagories: string) => client.query(
    ` 
    INSERT INTO quiz (challenger_username, challengee_username,question_ids,catagories) 
    VALUES($1, $2, $3, $4) 
    RETURNING quiz_id
    `,
    [challenger_username, challengee_username,question_ids,catagories]
)
    .then(res => res.rows)
    .catch(e => e);


export const get_quiz = (quiz_id: number) => client.query(
    'SELECT * FROM quiz WHERE quiz_id = $1',
    [quiz_id]
)
    .then(res => res.rows[0])
    .catch(e => e);