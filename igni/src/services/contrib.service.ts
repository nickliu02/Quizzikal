import { client } from './database.service';
import { Catagory } from '../types/catagories';

export const create_question = (text: string, correct: string, wrong: string[], catagory: Catagory) => client.query(
    'INSERT INTO questions (text,answer,wrong,catagory) VALUES ($1,$2,$3,$4)',
    [text, correct, wrong.join(','), catagory]
)
    .then(res => res)
    .catch(e => { console.log(e); return e; } );
