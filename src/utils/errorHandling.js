import ApiError from './ApiError'
import httpStatus from 'http-status'

export const catchMongooseError = err => {
  console.log(err);
  throw new ApiError(httpStatus.BAD_REQUEST, err.message)
}