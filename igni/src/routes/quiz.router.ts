import express, { Request } from 'express';
import { QuizCreateRequest } from '../types/request.types';
import { create_quiz, get_quiz, add_result, is_challenger, get_current_question_id } from '../services/quiz.service';
import { get_questions_of_catagory, get_question } from '../services/question.service';
import { Catagory } from '../types/catagories';
import { Question } from '../types/database.types';
import {check_auth} from "./middleware/check-auth";

export const quizRouter = express.Router();

quizRouter.post('/create', check_auth, async (req,res,next) => {

    const body: QuizCreateRequest = req.body;

    //catches problems
    if (body.catagories.length == 0) { next(new Error('No quiz catagories provided')); }

    // find questions based on catagories given
    const question_ids = await get_questions_of_catagory(body.catagories); 
    
    const string_ids: string = question_ids
        .map((row: {question_id: number}) => row.question_id)
        .join(',');

    const string_catagories = body.catagories.join(',');

    const quiz_id = await create_quiz(body.challenger_username,body.challengee_username,string_ids,string_catagories);
    res.send({...quiz_id});

});

quizRouter.get('/next', check_auth, async (req,res) => {

    const body: { username: string, quiz_id: number } = req.body;

    const quiz = await get_quiz(body.quiz_id);
    console.log(quiz);

    //TODO: some sort of auth quiz function just to check if user is acutally in quiz and tehre are still questions to do
    //count how many questions user has answered
    const challenger = is_challenger(body.username, quiz) 
    
    //map to corresponding quiz_id
    const current_question_id = get_current_question_id(challenger,quiz);

    //choose right and wrong answers and send to client
    const current_question = await get_question(current_question_id);

    const question = {
        text: current_question.text,
        choices: [
            current_question.correct,
            ...current_question.wrong
                .split(',')
                .sort(() => Math.random()-0.5)
                .slice(0,3),
        ].sort(() => Math.random()-0.5),
        catagory: current_question.catagory
    }

    res.send(question);

});


quizRouter.post('/submit', check_auth, async (req,res) => {

    const body: { username: string, quiz_id: number, answer: string } = req.body;

    //make sure player is in quiz and there are still questions to do

    const quiz = await get_quiz(body.quiz_id);

    const challenger = is_challenger(body.username, quiz) 
    const current_question_id = get_current_question_id(challenger,quiz);
    const current_question: Question = await get_question(current_question_id);

    //first check to see if answer was corerct
    if (current_question.correct = body.answer) {
        //next update quiz to include this answer
        add_result(body.username,challenger,body.quiz_id,1);
    } else {
        add_result(body.username,challenger,body.quiz_id,0);
    }

    //tell client the right answer
    res.send({answer: current_question.correct});

});
