import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    username: String,
    email: String,
    name: String,
    valid: { type: Boolean },
  },
  { timeStamps: true }
);

export default model("Session", sessionSchema);
