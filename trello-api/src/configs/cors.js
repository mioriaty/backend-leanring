import { WHITE_LIST_DOMAINS } from '~/utils/constants';
import ApiError from '~/utils/apiError';
import { StatusCodes } from 'http-status-codes';
import { env } from './environment';


export const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép request từ postman trong môi trường dev
    // Thông thường khi sử dụng postman thì cái origin sẽ là undefined
    if (!origin && env.BUILD_MODE === 'dev') {
      return callback(null, true);
    }

    // Cho phép request từ các domain trong white list
    if (WHITE_LIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} is not allowed by CORS`));
  },

  // for old browsers
  optionsSuccessStatus: StatusCodes.OK,

  // CORS sẽ cho phép client gửi cookie kèm theo request
  credentials: true
};