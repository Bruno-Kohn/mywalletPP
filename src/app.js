import express from 'express';
import cors from 'cors';
import * as userController from './controllers/userController.js';
import * as financialController from './controllers/financialController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', userController.signUp);
app.post('/sign-in', userController.signIn);

app.post('/financial-events', financialController.registerFinance);
app.get('/financial-events', financialController.checkFinance);
app.get('/financial-events/sum', financialController.sumFinance);

export default app;
