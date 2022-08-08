import { Types, Schema, model } from 'mongoose';
import { IComment } from './Comment';

export interface IActor {
  _id: Types.ObjectId;
  name: string;
  description: string;
  image: string;
  shared: boolean;
  comments: IComment[];
}

const schema = new Schema<IActor>(
  {
    name: String,
    description: String,
    image: String,
    shared: Boolean,
    comments: [{ type: Schema.Types.ObjectId, ref: 'User', comment: String }],
  },
  { timestamps: true },
);

export const Actor = model<IActor>('Actor', schema);
