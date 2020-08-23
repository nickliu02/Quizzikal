import express from 'express';
import { get_profile } from '../services/user.service';
import {check_auth} from "./middleware/check-auth";

export const userRouter = express.Router();


userRouter.get('/profile', check_auth, (req,res) => {

    const { username } = req.body;

    const result = get_profile(username);
    res.send(result);
});
