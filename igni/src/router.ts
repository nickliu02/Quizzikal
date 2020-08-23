import express from 'express';
import { register_user, authenticate_user } from './services/auth.service';
import { create_quiz } from './services/quiz.service';
import { get_profile } from './services/user.service';

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

    const { username } = req.body;

});

router.post('/createquiz', (req,res) => {

    const { challenger_username, challengee_username } = req.body;

    const result = create_quiz(challenger_username,challengee_username);
    res.send(result);
});