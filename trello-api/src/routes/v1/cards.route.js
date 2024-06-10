import express from 'express';
import { cardsController } from '~/controllers/cards.controller';
import { cardsValidation } from '~/validations/cards.validation';

const Router = express.Router();

// get all + create
Router.route('/')
  .get(cardsController.findAll)
  .post(cardsValidation.createCardValidation, cardsController.createNew);

// get one + update + delete
// Router.route('/:id')
//   .get()
//   .put()
//   .delete();

export const cardsRoutes = Router;