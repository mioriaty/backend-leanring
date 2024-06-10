import express from 'express';
import { boardsController } from '~/controllers/boards.controller';
import { boardsValidation } from '~/validations/boards.validation';

const Router = express.Router();

// get all + create
Router.route('/')
  .get(boardsController.getAllBoards)
  .post(boardsValidation.createBoardValidation, boardsController.createNew);

// get one + update + delete
Router.route('/:id')
  .get(boardsController.getBoardDetail)
  .put(boardsValidation.updateBoardValidation, boardsController.updateBoard);

// move card to another column
Router.route('/move-card')
  .put();

export const boardRoutes = Router;