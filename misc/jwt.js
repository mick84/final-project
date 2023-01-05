import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export const createToken = (_id) => {
  return jwt.sign({ _id }, `${process.env.JWT_SECRET}`, { expiresIn: "12h" });
};
