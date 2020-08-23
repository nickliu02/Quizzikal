import express from 'express';
import { get_profile } from '../services/user.service';
import {check_auth} from "./middleware/check-auth";
import { get_user_quizzes } from '../services/quiz.service';

export const userRouter = express.Router();


userRouter.get('/profile', check_auth, (req,res) => {

    const { username } = req.body;

    const result = get_profile(username);
    res.send(result);
});

userRouter.get('/games', check_auth, async (req,res) => {

    const { username } = req.body;

    const quizzes = await get_user_quizzes(username);

    //



});