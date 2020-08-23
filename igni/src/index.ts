import express from 'express';
import { router } from './router';

const app = express();

app.use('/', router);

const server = app.listen(3000, '127.0.0.1', () => console.log('server started'));
