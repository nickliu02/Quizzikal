import { client } from './database.service';
import { Catagory } from '../types/catagories';
import { Question } from '../types/database.types';
import { QUESTION_BATCH } from '../game_config';

export const get_questions_of_catagory = (catagories: Catagory[]): Promise<{question_id: number}[]> => client.query(
    `SELECT question_id FROM questions WHERE  
    ${
        catagories.map((c: Catagory) => `catagory = '${c}'`)
            .join(' OR ')
    }
    ORDER BY RANDOM() LIMIT $1`,
    [QUESTION_BATCH]
)
    .then(res => res.rows)
    .catch(e => { console.log(e); return e; } );

export const get_question = (question_id: number): Promise<Question> => client.query(
    'SELECT * FROM questions WHERE question_id = $1',
    [question_id]
)
    .then(res => res.rows[0])
    .catch(e => { console.log(e); return e; } );
