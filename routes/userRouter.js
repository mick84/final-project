import { Router } from "express";
import { createToken } from "../misc/jwt.js";
import { User } from "../models/User.js";
import multer from "multer";
import { requireAuth } from "../middleware/requireAuth.js";
import { sendSignUpMail } from "../misc/mailing.js";
export const userRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
userRouter.post("/register", async (req, res) => {
  try {
    const { passportID, email, password, nickname } = req.body;
    const user = await User.create({
      passportID,
      email,
      password,
      nickname,
    });
    const mailRes = await sendSignUpMail(email, nickname, password);
    console.log(mailRes);
    const token = createToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
userRouter.patch(
  "/avatar",
  requireAuth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(
        req.userID,
        {
          $set: { avatar: req.file.buffer },
        },
        { new: true }
      );
      res.status(201).send("avatar was set successfully");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);
userRouter.get("/avatar", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    if (!user.avatar) {
      throw new Error("no avatar available");
    }
    res.status(200).json({ avatar: user.avatar });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
