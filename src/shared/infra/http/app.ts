import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';

import createConnection from '@shared/infra/typeorm';
import { AppError } from '@shared/errors/AppErrors';
import { router } from './routes/index';
import '@shared/container';

createConnection();
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  if(err instanceof AppError) {
    return response.status(err.statusCode).json({message: err.message});
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });

});


export { app };