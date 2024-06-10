/* eslint-disable no-console */

// quản trị việc xác nhận người dùng - login và logout của user/* eslint-disable no-console */
import AsyncExitHook from 'async-exit-hook';
import express from 'express';
import { env } from './configs/env';
import { authRouter } from './routes/auth.route';

const START_SERVER = () => {
  const app = express();

  /** --- Init middlewares --- */
  app.use(express.json());

  /** --- Init databases --- */

  /** --- Init routes --- */
  app.use('/v1', authRouter);

  /** --- Handle errors --- */

  /** --- Clean up trước khi shutdown server --- */
  const server = app.listen(env.SERVER_PORT, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${env.SERVER_PORT}/`);
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