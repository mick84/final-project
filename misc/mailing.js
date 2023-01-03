import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_GMAIL_ACCOUNT,
    pass: process.env.MY_GMAIL_CUDE_APP_PASSWORD,
  },
});
const mailOptions = (email, nickname, password) => ({
  from: "CUDE - car undercover dealer exposure",
  to: email,
  subject: "Welcome to CUDE!",
  html: `<div><h1>Welcome to CUDE!</h1><h3>Your user name: ${nickname}</h3><h3>Your password:${password}</h3></div>`,
});
export const sendSignUpMail = async (email, nickname, password) => {
  try {
    const res = await transporter.sendMail(
      mailOptions(email, nickname, password)
    );
    return `Signup message to ${res.accepted[0]} was sent successfully.\n Message ID: ${res.messageId}`;
  } catch (error) {
    throw error;
  }
};
