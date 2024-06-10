import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { BOARD_TYPES } from '~/utils/constants';
import ApiError from '~/utils/apiError';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @type {import('express').RequestHandler}
 */
const createBoardValidation = async (req, res, next) => {
  // .strict() để bắt lỗi luôn khi có type casting
  const correctCond = Joi.object({
    title: Joi.string().required().min(5).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 5 characters',
      'string.max': 'Title must be at most 50 characters',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(5).max(256).trim().strict().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 5 characters',
      'string.max': 'Description must be at most 256 characters',
      'string.trim': 'Description must not have leading or trailing whitespace'
    }),
    type: Joi.string().required().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).messages({
      'any.required': 'Type is required',
      'string.empty': 'Type is required',
      'any.only': 'Type must be either public or private'
    })
  });

  try {
    // Trả về tất cả các lỗi, default: true thì khi gặp lỗi nó sẽ trả về lỗi đấy luôn chứ ko chạy tiếp
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
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @type {import('express').RequestHandler}
 */
const updateBoardValidation = async (req, res, next) => {
  const correctCond = Joi.object({
    title: Joi.string().min(5).max(50).trim().strict(),
    description: Joi.string().min(5).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
    columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
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


export const boardsValidation = {
  createBoardValidation,
  updateBoardValidation
};