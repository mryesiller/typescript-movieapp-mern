import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { body, check, validationResult } from 'express-validator';
import { User } from '../models/User';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors';

export const getLogin: RequestHandler = (req, res): void => {};
export const getRegister: RequestHandler = (req, res): void => {};

export const logout: RequestHandler = (req, res): void => {};

export const postLogin: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    await check('email', 'Email is not valid').isEmail().run(req);
    await check('password', 'Password cannot be blank')
      .isLength({ min: 6 })
      .run(req);
    await body('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ msg: errors.array()[0].msg });
    }

    const user: any = await User.findOne({ email });
    if (!user) {
      res.send(400).json({ msg: 'User not found' });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY as string, {
      expiresIn: 3600,
    });

    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).json({ msg: 'Success! You are logged in.', token: token });
  } catch (err) {}
};

export const postRegister: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new BadRequestError('Please provide all values');
    }

    await check('email', 'Email is not valid').isEmail().run(req);
    await check('password', 'Password must be at least 6 characters long')
      .isLength({ min: 6 })
      .run(req);
    await body('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array()[0].msg });
    }

    const userValid = await User.findOne({ email });

    if (userValid) {
      throw new BadRequestError('Email already in use');
    }

    const user = await User.create({ username, email, password });
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    if (err) {
      res.send({ status: 400, message: err });
      next();
    }
  }
};
