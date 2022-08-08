import { RequestHandler } from 'express';

export const home: RequestHandler = async (req, res): Promise<void> => {
  res.status(200).json({ msg: 'protected route' });
};
