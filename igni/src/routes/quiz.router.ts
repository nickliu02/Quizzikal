import express from 'express';
import { create_quiz } from '../services/quiz.service';
import { get_questions_of_catagory } from '../services/question.service';
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

    const quiz_id = create_quiz(body.challenger_username,body.challengee_username,string_ids,string_catagories);
    res.send(quiz_id);

});

quizRouter.get('/next', (req,res) => {

    const { username, quiz_id } = req.body;

    //count how many questions user has answered

    //map to corresponding quiz_id

    //choose right and wrong answers and send to client

});

quizRouter.post('/submit', (req,res) => {

    const { username, quiz_id, answer } = req.body;

    //first check to see if answer was corerct

    //next update quiz to include this answer

    //finally tell client if they got answer right or wrong
});
