import express from 'express';
import { create_quiz, get_quiz } from '../services/quiz.service';
import { get_questions_of_catagory, get_question } from '../services/question.service';
import { Catagory } from '../types/catagories';

export const quizRouter = express.Router();

quizRouter.post('/create', async (req,res) => {

    const body: { challenger_username: string, challengee_username: string, catagories: Catagory[] } = req.body;

    // find questions based on catagories given
    const question_ids = await get_questions_of_catagory(body.catagories);

    const string_ids: string = question_ids
        .map((row: {question_id: number}) => row.question_id)
        .join(',');

    const string_catagories = body.catagories.join(',');

    const quiz_id = await create_quiz(body.challenger_username,body.challengee_username,string_ids,string_catagories);
    res.send(...quiz_id);

});

quizRouter.get('/next', async (req,res) => {

    const body: { username: string, quiz_id: number } = req.body;

    const quiz = await get_quiz(body.quiz_id);
    console.log(quiz);

    //count how many questions user has answered
    var results = '';
    if (quiz.challenger_username == body.username) {
        results = quiz.challenger_results;
    } else if (quiz.challengee_username == body.username) {
        results = quiz.challengee_results;
    } else {
        res.send('You are not in this quiz');
        return;
    }
    
    console.log(results);

    //map to corresponding quiz_id
    const question_index = results.split(',').length - 1;
    const current_question_id = parseInt(quiz.question_ids.split(',')[question_index]);

    //choose right and wrong answers and send to client
    const current_question = await get_question(current_question_id);
    console.log(current_question);

});

quizRouter.post('/submit', (req,res) => {

    const { username, quiz_id, answer } = req.body;

    //first check to see if answer was corerct

    //next update quiz to include this answer

    //finally tell client if they got answer right or wrong
});
