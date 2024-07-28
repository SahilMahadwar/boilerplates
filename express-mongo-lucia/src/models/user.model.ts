import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  transform(): Record<string, unknown>;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [false, "Please add user name"],
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    roles: {
      type: Array,
      required: [true],
      default: ["user"],
    },
  },
  { timestamps: true }
);

UserSchema.method("transform", function () {
  const fields = ["_id", "name", "email", "createdAt", "updatedAt"] as const;
  return fields.reduce((transformed: Record<string, unknown>, field) => {
    transformed[field] = this[field];
    return transformed;
  }, {});
});

export const User = mongoose.model<IUser>("User", UserSchema);
