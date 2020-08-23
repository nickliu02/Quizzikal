import express from 'express';
import { register_user } from 'services/auth.service';

export const router = express.Router();

router.post('/register', (req,res) => {

    const { username, password } = req.body;

    register_user(username, password);

});

router.post('/login', (req,res) => {

});

