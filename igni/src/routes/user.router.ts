import express, { Request } from 'express';
import { get_profile } from '../services/user.service';
import { is_challenger } from '../services/quiz.service';
import {check_auth} from "./middleware/check-auth";
import { get_user_quizzes } from '../services/quiz.service';
import { Quiz } from '../types/database.types';
import { QUESTION_BATCH } from '../game_config';

export const userRouter = express.Router();


userRouter.get('/profile', check_auth, (req,res) => {

    const { username } = req.body;

    const result = get_profile(username);
    res.send(result);
});

userRouter.get('/games', check_auth, async (req: any, res: any) => {

    //get username from auth token 
    const username = req.userData.username;
    const quizzes: Quiz[] = await get_user_quizzes(username);

    const incoming = quizzes
        .filter((quiz: Quiz) => quiz.challengee_username == username)
        .filter((quiz: Quiz) => quiz.challengee_results.split(',').length-1 === 0)
        .map((quiz: Quiz) => ({
            quiz_ip: quiz.quiz_id,
            opponent_username: quiz.challenger_username,
        }));

    const outgoing = quizzes
        .filter((quiz: Quiz) => quiz.challenger_results.split(',').length-1 < QUESTION_BATCH && quiz.challengee_results.split(',').length-1 < QUESTION_BATCH)
        .map((quiz: Quiz) => ({
            quiz_ip: quiz.quiz_id,
            opponent_username: is_challenger(username, quiz) ? quiz.challengee_username : quiz.challenger_username,
            progress: () => {
                const results = is_challenger(username, quiz) ? quiz.challenger_results : quiz.challengee_results;
                return results.length-1;
            }
        }));

    const done = quizzes
        .filter((quiz: Quiz) => quiz.challenger_results.split(',').length-1 === QUESTION_BATCH && quiz.challengee_results.split(',').length-1 === QUESTION_BATCH)
        .map((quiz: Quiz) => ({
            quiz_ip: quiz.quiz_id,
            opponent_username: quiz.challenger_username,
            your_score: () => {
                const results = is_challenger(username, quiz) ? quiz.challenger_results : quiz.challengee_results;
                return results
                    .split(',')
                    .filter((result: string) => result === '1')
                    .length
            },
            opponent_score: () => {
                const results = is_challenger(username, quiz) ? quiz.challengee_results : quiz.challenger_results;
                return results
                    .split(',')
                    .filter((result: string) => result === '1')
                    .length
            }
        }));
    
    res.send({
        incoming,
        outgoing,
        done
    })
});