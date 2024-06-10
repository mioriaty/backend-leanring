
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { env } from '~/configs/env';
import { verifyTokenMiddleware } from '~/middlewares/jwt.middleware';

const Router = express.Router();

const users = [
  {
    id: 1,
    username: 'henry',
    refreshToken: null
  },
  {
    id: 2,
    username: 'jim',
    refreshToken: null
  }
];

const generateToken = (payload) => {
  const { id, username } = payload;

  const access_token = jwt.sign({ id, username }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: '5m'
  });

  const refresh_token = jwt.sign({ id, username }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1h'
  });

  return {
    access_token,
    refresh_token
  };
};

const updateRefreshToken = (username, refreshToken) => {
  return users.forEach(user => {
    if (user.username === username) {
      user.refreshToken = refreshToken;
    }
  });
};

Router.post('/login', (req, res ) => {
  const username = req.body.username;

  const user = users.find(user => user.username === username);

  if (user) {
    // Create a token
    const tokens = generateToken(user);

    updateRefreshToken(username, tokens.refresh_token);

    console.log('Login', users);

    return res.status(StatusCodes.OK).json(tokens);
  }

  return res.status(StatusCodes.UNAUTHORIZED).json({
    message: 'Invalid username'
  });
});

Router.post('/refresh-token', (req, res) => {
  const refresh_token = req.body.refresh_token;

  if (!refresh_token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Refresh token is required'
    });
  }
  const user = users.find(user => user.refreshToken === refresh_token);

  if (!user) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Invalid refresh token'
    });
  }
  try {
    jwt.verify(refresh_token, env.REFRESH_TOKEN_SECRET);

    const tokens = generateToken(user);

    updateRefreshToken(user.username, tokens.refresh_token);

    console.log('Refresh token', users);

    return res.status(StatusCodes.OK).json(tokens);

  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Invalid refresh token'
    });
  }
});

Router.delete('/logout', verifyTokenMiddleware, (req, res) => {
  try {
    const user = users.find(user => user.id === req.userId);
    updateRefreshToken(user.username, null);

    console.log('User logged out', users);

    return res.status(StatusCodes.OK).json({
      message: 'User logged out'
    });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid token'
    });
  }
});

export const authRouter = Router;