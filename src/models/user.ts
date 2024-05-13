import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    id: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", UserSchema);
