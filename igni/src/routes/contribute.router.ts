import express from 'express';
import {create_question} from "../services/contrib.service";
import {check_auth} from "./middleware/check-auth";
import { Catagory } from '../types/catagories'

export const contributeRouter = express.Router();

contributeRouter.post('/create', check_auth, async (req, res) => {
    
    const body: {text: string, correct: string, wrong: string[], catagory: Catagory} = req.body;

    try {
        await create_question(body.text, body.correct, body.wrong, body.catagory);
    } catch(e) { 
        res.send({message: e}); 
        console.log(e);
        return; 
    }

    res.send({message: "accepted"});

});
