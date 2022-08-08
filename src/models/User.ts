import bcrypt from 'bcryptjs';
import mongoose, { Types, Schema, model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { IMovie } from './Movie';
import { IActor } from './Actor';

interface AuthToken {
  accessToken: string;
}

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  username: string;

  movies: IMovie[];
  actors: IActor[];

  token: AuthToken;

  comparePassword: any;
  createJWT: any;
}

const schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: 6,
    },
    username: {
      type: String,
      required: [true, 'Please provide username'],
      minLength: 3,
      maxLength: 20,
      trim: true,
    },

    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],

    token: String,
  },
  { timestamps: true },
);

schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

schema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id as string }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

schema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export const User = model<IUser>('User', schema);
