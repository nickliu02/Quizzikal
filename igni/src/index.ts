import express from 'express';
import { serverIp } from './config';

import { authRouter } from './routes/auth.router';
import { quizRouter } from './routes/quiz.router';
import { userRouter } from './routes/user.router';
import {contributeRouter} from "./routes/contribute.router";

const app = express();

const bodyPareser = require('body-parser');
app.use(bodyPareser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors');
app.use(cors());

//router
app.use('/auth', authRouter);
app.use('/quiz', quizRouter);
app.use('/user', userRouter);
app.use('/contrib', contributeRouter)

const server = app.listen(3000, serverIp, () => console.log('server started'));
