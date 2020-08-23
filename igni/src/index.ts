import express from 'express';
import { router } from './router';
import { serverIp } from './config';

const app = express();

const bodyPareser = require('body-parser');
app.use(bodyPareser.json());

app.use('/', router);

app.use(express.json)

const server = app.listen(3000, serverIp, () => console.log('server started'));
