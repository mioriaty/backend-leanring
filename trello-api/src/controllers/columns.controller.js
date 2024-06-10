import { StatusCodes } from 'http-status-codes';
import { transformReturnResponse } from '~/helpers/transformReturnResponse';
import { columnsService } from '~/services/columns.service';

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
    const createdColumn= await columnsService.createNew(req.body);

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.CREATED).json(transformReturnResponse({
      data: createdColumn,
      message: 'Created new column successfully',
      status: StatusCodes.CREATED
    }));
  } catch (error) {
    next(error);
  }
};

/**
 * @type {import('express').RequestHandler}
 */
const findAll = async (req, res, next) => {
  try {
    // Điều hướng sang tầng service
    const columns = await columnsService.findAll();

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.OK).json(transformReturnResponse({
      data: columns,
      message: 'Get all columns successfully',
      status: StatusCodes.OK
    }));
  } catch (error) {
    next(error);
  }
};

/**
 * @type {import('express').RequestHandler}
 */
const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const updatedColumn = await columnsService.update(columnId, req.body);

    res.status(StatusCodes.OK).json(transformReturnResponse({
      data: updatedColumn,
      message: 'Updated column successfully',
      status: StatusCodes.OK
    }));
  } catch (error) {
    next(error);
  }
};

export const columnsController = {
  createNew,
  findAll,
  update
};