import { client } from 'services/database.service';

export const create_quiz = (challenger_username: string, challengee_username: string, catagories) => client.query(
    'INSERT INTO quiz(challenger_id, challengee_id, challenger_finished, challengee_finished, question_pool, catagories) \
    VALUES()
    ',
    [
        
    ]
)
