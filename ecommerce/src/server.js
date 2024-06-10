/* eslint-disable no-console */
import AsyncExitHook from 'async-exit-hook';
import express from 'express';
import { env } from './configs/env';
import morgan from 'morgan';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import compression from 'compression';

const START_SERVER = () => {
  const app = express();

  /** --- Init middlewares --- */
  app.use(express.json());
  app.use(morgan('dev')); // log request
  app.use(helmet()); // secure express app
  app.use(compression()); // compress all responses
  // app.use(cors(corsOptions));

  /** --- Init databases --- */
  require('./databases/mongo.db');

  /** --- Init routes --- */
  app.get('/', (_, res) => {
    return res.status(StatusCodes.OK).json({
      message: 'Hello World!'
    });
  });

  /** --- Handle errors --- */
  const server = app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  });

  /** --- Clean up trước khi shutdown server --- */
  AsyncExitHook(async () => {
    server.close(() => console.log('Server is shutting down'));
  });
};


(async function () {
  try {
    START_SERVER();
  } catch (error) {
    process.exit(0);
  }
})();