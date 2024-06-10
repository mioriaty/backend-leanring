import { StatusCodes } from 'http-status-codes';
import { transformReturnResponse } from '~/helpers/transformReturnResponse';
import { boardsService } from '~/services/boards.service';

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
    const createdBoard= await boardsService.createNew(req.body);

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.CREATED).json(transformReturnResponse({
      data: createdBoard,
      message: 'Created new board successfully',
      status: StatusCodes.CREATED
    }));
  } catch (error) {
    next(error);
  }
};

/**
 * @type {import('express').RequestHandler}
 */
const getBoardDetail = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    // Điều hướng sang tầng service
    const board= await boardsService.getBoardDetail(boardId);

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.OK).json(transformReturnResponse({
      data: board,
      message: 'Get board detail successfully',
      status: StatusCodes.OK
    }));
  } catch (error) {
    next(error);
  }
};

const getAllBoards = async (req, res, next) => {
  try {
    // Điều hướng sang tầng service
    const boards = await boardsService.getAllBoards();

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.OK).json(transformReturnResponse({
      data: boards,
      message: 'Get all boards successfully',
      status: StatusCodes.OK
    }));
  } catch (error) {
    next(error);
  }
};

/**
 * @type {import('express').RequestHandler}
 */
const updateBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    // Điều hướng sang tầng service
    const updatedBoard= await boardsService.updateBoard(boardId, req.body);

    // Có kết quả thì trả về cho client
    res.status(StatusCodes.OK).json(transformReturnResponse({
      data: updatedBoard,
      message: 'Updated board successfully',
      status: StatusCodes.OK
    }));
  } catch (error) {
    next(error);
  }
};

export const boardsController = {
  createNew,
  getBoardDetail,
  getAllBoards,
  updateBoard
};