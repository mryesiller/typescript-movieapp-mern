import { Types, Schema, model } from 'mongoose';
import { IComment } from './Comment';

export interface IMovie {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  shared: boolean;
  comments: IComment[];
}

const schema = new Schema<IMovie>(
  {
    title: String,
    description: String,
    image: String,
    shared: Boolean,
    comments: [{ type: Schema.Types.ObjectId, ref: 'User', comment: String }],
  },
  { timestamps: true },
);

export const Movie = model<IMovie>('Movie', schema);
