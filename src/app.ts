/* eslint-disable no-console */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();

import { globalErrorHandler } from './app/middleware/globalErrorHandler';

import httpStatus from 'http-status';
import routes from './app/routes';
app.use(cors());
app.use(cookieParser());

//parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom routes
// first way to configure routes
app.use('/api/v1', routes);

// second way to configure routes
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/semester/', SemesterRoutes);

// default routes for testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

//global error handler
app.use(globalErrorHandler);

// Not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
