import CustomAPIError from './CustomError';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomAPIError {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
