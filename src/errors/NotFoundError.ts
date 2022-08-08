import CustomAPIError from './CustomError';
import { StatusCodes } from 'http-status-codes';

class NotFoundError extends CustomAPIError {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
