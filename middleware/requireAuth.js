import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
export const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "authorization token required" });

  //console.log(authorization);
  const [_, token] = authorization.split(" ");
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = await User.findById(_id).select("_id");

    next();
  } catch (error) {
    return res.status(401).json({ error: "request is not authorized!" });
  }
};
