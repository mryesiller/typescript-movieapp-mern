import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export interface Errorhandler extends Error {
  statusCode?: any;
  code?: any;
  errors?: any;
  keyValue: any;
}

const errorHandlerMiddleware = (
  err: Errorhandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;

    defaultError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',');
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;

    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
