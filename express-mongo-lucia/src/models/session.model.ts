import mongoose, { Schema } from "mongoose";

export interface ISession extends Document {
  _id: string;
  user_id: string;
  expires_at: Date;
}

const SessionSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },

    expires_at: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

export const Session = mongoose.model<ISession>("Session", SessionSchema);
