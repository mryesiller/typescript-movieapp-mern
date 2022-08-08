import express, { Request, Response, Application } from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan = require('morgan');
import * as dotenv from 'dotenv';
import { db } from './config/db';

import { authRouter, homeRouter } from './routes';

const app: Application = express();
dotenv.config();
db();

app.set('port', process.env.PORT || 3000);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan<Request, Response>('dev'));
}

app.use('/', authRouter);
app.use('/dashboard', homeRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'TEST' });
});

export default app;
