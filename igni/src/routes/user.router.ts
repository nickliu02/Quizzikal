import express from 'express';
import { get_profile } from '../services/user.service';

export const userRouter = express.Router();


userRouter.get('/profile', (req,res) => {

    const { username } = req.body;

    const result = get_profile(username);
    res.send(result);
});