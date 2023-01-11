import { Router } from "express";
import { createToken } from "../misc/jwt.js";
import { User } from "../models/User.js";
import multer from "multer";
import { requireAuth } from "../middleware/requireAuth.js";
import { sendSignUpMail } from "../misc/mailing.js";

export const userRouter = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatars");
  },
  filename: function (req, file, cb) {
    cb(null, `avatar_${req.userID._id}.${file.originalname.split(".")[1]}`);
  },
});
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './avatars');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
  limits: {
    fileSize: 1024 * 1024 // Limit file size to 1MB
  },
  fileFilter: function (req, file, cb) {
    // Only allow certain file types
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      // The file type is not allowed
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});
*/

const upload = multer({
  storage,
  limits: {
    fileSize: 500000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error(`Please upload picture only!`));
    }

    cb(undefined, true);
  },
});

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
  (req, res) => {
    /*
      await User.findByIdAndUpdate(
        req.userID,
        {
          $set: { avatar: req.file.buffer },
        },
        { new: true }
      );*/

    res.status(201).send("avatar was set successfully");
  },

  (err, req, res, next) => {
    res.status(400).json({ error: err.message });
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
