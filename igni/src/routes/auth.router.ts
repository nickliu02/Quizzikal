import express from 'express';
import { register_user, authenticate_user } from '../services/auth.service';

export const authRouter = express.Router();

authRouter.post('/register', (req,res) => {

    const { username, password } = req.body;

    //check that username isnt already registered


    const result = register_user(username, password);
    res.send('success');

});

authRouter.post('/login', (req,res) => {

    const { username, password } = req.body;

    const result = authenticate_user(username, password);
    res.send(result);
});