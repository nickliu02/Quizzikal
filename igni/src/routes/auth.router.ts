import express from 'express';
import { register_user, authenticate_user } from '../services/auth.service';

export const authRouter = express.Router();

authRouter.post('/register', (req,res) => {

    const { username, password } = req.body;

    //check that username isnt already registered

    const token = register_user(username, password);

    res.send({accessToken: token});

});

authRouter.post('/login', (req,res) => {

    const { username, password } = req.body;

    const token = authenticate_user(username, password);

    res.send({accessToken: token});
});
