import { StatusCodes } from 'http-status-codes';
import { transformReturnResponse } from '~/helpers/transformReturnResponse';
import { cardsService } from '~/services/cards.service';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @type {import('express').RequestHandler}
 */
const createNew = async (req, res, next) => {
  try {
    // Điều hướng sang tầng service
    const createdCard= await cardsService.createNew(req.body);

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.CREATED).json(transformReturnResponse({
      data: createdCard,
      message: 'Created new card successfully',
      status: StatusCodes.CREATED
    }));
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const cards = await cardsService.findAll();

    res.status(StatusCodes.OK).json(transformReturnResponse({
      data: cards,
      message: 'Get all cards successfully',
      status: StatusCodes.OK
    }));
  } catch (error) {
    next(error);
  }


};

export const cardsController = {
  createNew,
  findAll
};