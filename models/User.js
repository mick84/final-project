import { set, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import * as dotenv from "dotenv";
dotenv.config();
set("strictQuery", true);
const UserSchema = new Schema(
  {
    passportID: {
      type: String,
      required: true,
      validate(data) {
        if (!data.match(/^\d{9}$/g))
          throw new Error("Not an Israeli passport ID format.");
      },
    },
    email: {
      type: String,
      required: true,
      validate(data) {
        if (!validator.isEmail(data)) throw new Error("Invalid email format");
      },
    },
    password: {
      type: String,
      required: true,
      validate(data) {
        if (!validator.isStrongPassword(data))
          throw new Error("Given password is not strong enough");
      },
    },
    nickname: {
      type: String,
      required: true,
      validate(data) {
        if (!data.match(/^\w{4,10}$/g)) {
          throw new Error(
            "Invalid user name: must contain 4-10 alphanumerical characters only"
          );
        }
      },
    },
    avatar: Buffer,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const existingUser = await User.findOne({
      $or: [
        { passportID: this.passportID },
        { email: this.email },
        { nickname: this.nickname },
      ],
    });
    switch (true) {
      case existingUser?.passportID === this.passportID:
        throw new Error(`Passport ID ${this.passportID} is already in use.`);
      case existingUser?.email === this.email:
        throw new Error(`Email ${this.email} is already in use.`);
      case existingUser?.nickname === this.nickname:
        throw new Error(`Nickname ${this.nickname} is already in use.`);
    }
    this.$set(
      "password",
      await bcrypt.hash(this.password, +process.env.SALT_ROUNDS)
    );
    next();
  } catch (error) {
    throw error;
  }
});

UserSchema.statics.login = async function (email, password) {
  try {
    if (!(email && password)) {
      throw new Error("Missing required fields");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Wrong email format provided!");
    }
    const user = await this.findOne({ email }).select("-avatar");
    if (!user) {
      throw new Error(`user with this email does not exist!`);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error(`Passwords don't match!`);
    }
    return user;
  } catch (error) {
    throw error;
  }
};
/*
UserSchema.statics.registerUser = async function (
  passportID,
  email,
  password,
  nickname
) {
  try {
    const existingUser = await this.findOne({
      $or: [{ passportID }, { email }, { nickname }],
    });
    switch (true) {
      case existingUser?.passportID === passportID:
        throw new Error(`Passport ID ${passportID} is already in use.`);
      case existingUser?.email === email:
        throw new Error(`Email ${email} is already in use.`);
      case existingUser?.nickname === nickname:
        throw new Error(`Nickname ${nickname} is already in use.`);
      case !passportID.match(/^\d{9}$/g):
        throw new Error("Not an Israeli passport ID format.");
      case !nickname.match(/^\w{3,10}$/g):
        throw new Error(
          "Invalid user name: must contain 3-10 alphanumerical characters only"
        );
      case !validator.isEmail(email):
        throw new Error("Invalid email format");
      case !validator.isStrongPassword(password):
        throw new Error("Provided password is not strong enough.");
    }
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS
    );
    const user = await this.create({
      passportID,
      email,
      password: hashedPassword,
      nickname,
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
*/
export const User = model("User", UserSchema);
