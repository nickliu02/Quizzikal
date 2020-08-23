import express from 'express';
import { register_user, authenticate_user } from './services/auth.service';

export const router = express.Router();

router.post('/register', (req,res) => {

    const { username, password } = req.body;

    const result = register_user(username, password);
    res.send('success');

});

router.post('/login', (req,res) => {

    const { username, password } = req.body;

    const result = authenticate_user(username, password);
    res.send(result);
});

router.get('/profile', (req,res) => {

});