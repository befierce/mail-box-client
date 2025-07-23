import { Schema, model } from "mongoose";

interface iUser {
  email: String;
  password: String;
}

const userSchema = new Schema<iUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


export const User = model<iUser>("User",userSchema)