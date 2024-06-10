import express from 'express';
import { verifyTokenMiddleware } from '~/middlewares/jwt.middleware';

const Router = express.Router();

const posts = [
  {
    userId: 1,
    post: 'post henry'
  },
  {
    userId: 2,
    post: 'post jim'
  },
  {
    userId: 1,
    post: 'post henry 2'
  }
];

Router
  .get('/posts', verifyTokenMiddleware, (req, res) => {
    return res.json(posts.filter(post => post.userId === req.userId));
  });

export const postsRouter = Router;

