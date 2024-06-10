/* eslint-disable no-console */
import AsyncExitHook from 'async-exit-hook';
import express from 'express';
import { env } from './configs/env';
import { postsRouter } from './routes/posts.route';

const START_SERVER = () => {
  const app = express();

  /** --- Init middlewares --- */
  app.use(express.json());

  /** --- Init databases --- */

  /** --- Init routes --- */
  app.use('/v1', postsRouter);

  /** --- Handle errors --- */

  /** --- Clean up trước khi shutdown server --- */
  const server = app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  });
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