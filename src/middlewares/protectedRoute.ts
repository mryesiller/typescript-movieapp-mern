import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError } from '../errors';

interface IUserRequest extends Request {
  user: jwt.JwtPayload;
}

UnauthenticatedError;
const protectedRoute = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY) as jwt.JwtPayload;
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};
export default protectedRoute;
