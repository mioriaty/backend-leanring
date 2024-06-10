import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from './boards.route';
import { columnsRoutes } from './columns.route';
import { cardsRoutes } from './cards.route';

const Router = express.Router();

/** Check api v1 status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'API v1 is ready!'
  });
});

/** Boards api */
Router.use('/boards', boardRoutes);

Router.use('/columns', columnsRoutes);

Router.use('/cards', cardsRoutes);

export const APIs_V1 = Router;