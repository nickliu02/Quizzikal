import express from 'express';
import {create_question} from "../services/contrib.service";
import {check_auth} from "./middleware/check-auth";

export const contributeRouter = express.Router();

contributeRouter.post('create', check_auth, (req, res) => {
    create_question(req.body.question,req.body.answer,req.body.wrong_answers)
});
