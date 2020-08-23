import { client } from './database.service';
import { Quiz, Question } from '../types/database.types';

export const create_quiz = (challenger_username: string, challengee_username: string, question_ids: string, catagories: string): Promise<{quiz_id: number}> => client.query(
    ` 
    INSERT INTO quiz (challenger_username, challengee_username,question_ids,catagories) 
    VALUES($1, $2, $3, $4) 
    RETURNING quiz_id
    `,
    [challenger_username, challengee_username,question_ids,catagories]
)
    .then(res => res.rows[0])
    .catch(e => { console.log(e); return e });


export const get_quiz = (quiz_id: number): Promise<Quiz> => client.query(
    'SELECT * FROM quiz WHERE quiz_id = $1',
    [quiz_id]
)
    .then(res => res.rows[0])
    .catch(e => console.log(e));

export const get_user_quizzes = (username: number): Promise<Quiz> => client.query(
    'SELECT * FROM quiz WHERE challenger_username = $1 OR challengee_username = $1',
    [username]
)
    .then(res => res.rows)
    .catch(e => e);

export const add_result = (username: string, is_challenger: boolean, quiz_id: number, result: 0 | 1) => client.query(
    `UPDATE quiz SET ${is_challenger?'challenger_results':'challengee_results'} = 
    CONCAT_WS(',',${is_challenger?'challenger_results':'challengee_results'},'${result}')
    WHERE ${is_challenger?'challenger_username':'challengee_username'} = $1`,
    [username]
)
    .then(res => res)
    .catch(e => e);

// export const is_challenger = (username: string, quiz_id: number) => client.query(
//     'SELECT * FROM quiz WHERE challenger_username = $1',
//     [username]
// )
//     .then(res => res.rows != null)
//     .catch(e => e);

export const is_challenger = (username: string, quiz_object: Quiz): boolean => {

    if (quiz_object.challenger_username == username) {
        return true;
    } else if (quiz_object.challengee_username == username) {
        return false;
    } else {
        throw new Error("You are not part of this game");
    }

} 

export const get_current_question_id = (challenger: boolean, quiz_object: Quiz): number => {
    var results = challenger ? quiz_object.challenger_results : quiz_object.challengee_results;
    const question_index = results.split(',').length - 1;
    return parseInt(quiz_object.question_ids.split(',')[question_index]);
}