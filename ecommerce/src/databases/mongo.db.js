import mongoose from 'mongoose';
import { env } from '~/configs/env';

mongoose.connect(env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Connect to MongoDB failed', error);
  });

export default mongoose;