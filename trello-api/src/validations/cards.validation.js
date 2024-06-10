import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';
import ApiError from '~/utils/apiError';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @type {import('express').RequestHandler}
 */
const createCardValidation = async (req, res, next) => {
  const correctCond = Joi.object({
    title: Joi.string().required().min(5).max(50).trim().strict(),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  });

  try {
    await correctCond.validateAsync(req.body, {
      abortEarly: false
    });

    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const cardsValidation = {
  createCardValidation
};