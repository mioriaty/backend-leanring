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
const createColumnValidation = async (req, res, next) => {

  const correctCond = Joi.object({
    title: Joi.string().required().min(5).max(50).trim().strict(),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  });

  try {
    await correctCond.validateAsync(req.body, {
      abortEarly: false
    });

    // Validate xong thì chuyển sang controller hoặc middleware
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};


/**
 * @type {import('express').RequestHandler}
 */
const updateColumnValidation = async (req, res, next) => {
  const correctCond = Joi.object({
    title: Joi.string().min(5).max(50).trim().strict(),
    boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  });

  try {
    // Trả về tất cả các lỗi, default: true thì khi gặp lỗi nó sẽ trả về lỗi đấy luôn chứ ko chạy tiếp
    await correctCond.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true // Cho phép validate các key không được định nghĩa trong schema
    });

    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const columnsValidation = {
  createColumnValidation,
  updateColumnValidation
};