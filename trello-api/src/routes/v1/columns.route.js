import express from 'express';
import { columnsController } from '~/controllers/columns.controller';
import { columnsValidation } from '~/validations/columns.validation';

const Router = express.Router();

// get all + create
Router.route('/')
  .post(columnsValidation.createColumnValidation, columnsController.createNew)
  .get(columnsController.findAll);

// get one + update + delete
Router.route('/:id')
  .put(columnsValidation.updateColumnValidation, columnsController.update);

export const columnsRoutes = Router;