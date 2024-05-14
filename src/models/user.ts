import { model, Schema } from "mongoose";

export enum UserStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  DELETED = "deleted",
}

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: Object.values(UserStatusEnum),
      default: UserStatusEnum.ACTIVE,
    },
    deletedAt: { type: Date, default: undefined, required: false },
  },
  {
    timestamps: true,
  }
);

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  status: UserStatusEnum;
}

export const UserModel = model("User", UserSchema);
