import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
export const cookieAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token missing");
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = await User.findById(_id).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};
