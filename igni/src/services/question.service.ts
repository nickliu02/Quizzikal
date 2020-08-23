import { client } from './database.service';
import { Catagory } from '../types/catagories';

const QUIZ_BATCH_SIZE = 6;

export const get_questions_of_catagory = (catagories: Catagory[]): Promise<{question_id: number}[]> => client.query(
    `SELECT question_id FROM questions WHERE  
    ${
        catagories.map((c: Catagory) => `catagory = '${c}'`)
            .join(' OR ')
    }
    ORDER BY RANDOM() LIMIT $1`,
    [QUIZ_BATCH_SIZE]
)
    .then(res => res.rows)
    .catch(e => e);

export const get_question = (question_id: number) => client.query(
    'SELECT * FROM questions WHERE question_id = $1',
    [question_id]
)
    .then(res => res.rows[0])
    .catch(e => e);
