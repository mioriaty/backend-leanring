import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { env } from '~/configs/env';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @type {import('express').RequestHandler}
 */
export const verifyTokenMiddleware = async (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  try {
    const decodedUser = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    req.userId = decodedUser.id;
    next();
  } catch (err) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
};
