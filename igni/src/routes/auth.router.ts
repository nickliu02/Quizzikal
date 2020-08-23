import express from 'express';
import { register_user, authenticate_user } from '../services/auth.service';

export const authRouter = express.Router();

authRouter.post('/register', async (req,res) => {

    const { username, password } = req.body;

    //check that username isnt already registered

    const token = await register_user(username, password);

    res.send({accessToken: token});

});

authRouter.post('/login', async (req,res) => {

    const { username, password } = req.body;

    const token = await authenticate_user(username, password);

    res.send({accessToken: token});
});
