import { Types } from 'mongoose';
import { IUser } from './User';

export interface IComment {
  _id: Types.ObjectId;
  user: IUser;
  comment: string;
}
