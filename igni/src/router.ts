import express from 'express';
import { register_user } from './services/auth.service';

export const router = express.Router();

router.post('/register', async (req,res) => {

    const { username, password } = req.body;

    const result = await register_user(username, password);
    res.send('success');

});

router.post('/login', (req,res) => {

});

