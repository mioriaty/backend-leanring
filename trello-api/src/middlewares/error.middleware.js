/* eslint-disable no-unused-vars */

import { StatusCodes } from 'http-status-codes';
import { env } from '~/configs/environment';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Middleware xử lý lỗi tập trung trong ứng dụng
 * @param {Error & { statusCode?: number }} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const errorHandlingMiddleware = (err, req, res, next) => {
  // Nếu dev ko cẩn thận thiếu status code thì mặc định là 500
  if (!err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  // Tạo ta một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    message: err.message,
    statusCode: err.statusCode || StatusCodes[err.statusCode],
    stack: err.stack,
    name: err.name
  };

  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi.
  if (env.BUILD_MODE !== 'dev') delete responseError.stack;

  // Đoạn này có thể mở rộng nhiều về sau như ghi Error Log vào file, bắn thông báo lỗi vào group Slack, Telegram, Email...vv Hoặc có thể viết riêng Code ra một file Middleware khác tùy dự án.
  // do something with error

  // Trả về lỗi cho client
  res.status(responseError.statusCode).json(responseError);
};