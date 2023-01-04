import { set, Schema, model } from "mongoose";
set("strictQuery", true);
const FeedbackSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      decimal: true,
    },
    content: {
      type: String,
      required: true,
    },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export const Feedback = model("Feedback", FeedbackSchema);
