import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { Feedback } from "../models/Feedback.js";
import { FEEDBACK_PAGE_SIZE } from "../misc/config.js";
export const feedbackRouter = Router();
feedbackRouter.get("/:page", async (req, res) => {
  try {
    const feedbacksList = await Feedback.find({})
      .limit(FEEDBACK_PAGE_SIZE)
      .skip(FEEDBACK_PAGE_SIZE * (req.params.page - 1))
      .populate("sender")
      .select("-createdAt -__v")
      .lean();
    const doc = feedbacksList.map((fb) => ({
      ...fb,
      sender: fb.sender._id,
      senderNick: fb.sender.nickname,
    }));
    res.status(200).json(doc);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
});
feedbackRouter.post("/", requireAuth, async (req, res) => {
  try {
    const {
      userID: sender,
      body: { rating, content },
    } = req;

    const fb = await Feedback.create({
      sender,
      rating,
      content,
    });
    const populated = await fb.populate("sender", "nickname");
    const result = {
      feedbackID: fb._id,
      senderID: populated.sender._id,
      sender: populated.sender.nickname,
      rating,
      content,
      date: populated.updatedAt,
    };
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});
feedbackRouter.patch("/:feedbackID", requireAuth, async (req, res) => {
  try {
    const {
      body: { rating, content },
      userID,
      params: { feedbackID },
    } = req;
    //check if the user has feedback with given ID:
    const test = await Feedback.findOne({
      $and: [{ _id: feedbackID }, { sender: userID }],
    });
    if (!test) {
      throw new Error(
        "Can not update: Either feedback does not exist, or you didn't write it!"
      );
    }
    await test.update({ $set: { rating, content } }, { new: true });

    res.status(201).send("Updated successfully!");
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
});
feedbackRouter.delete("/:feedbackID", requireAuth, async (req, res) => {
  try {
    const {
      userID,
      params: { feedbackID },
    } = req;
    //check if the user has feedback with given ID:
    const test = await Feedback.findOneAndDelete({
      $and: [{ _id: feedbackID }, { sender: userID }],
    });
    if (!test) {
      throw new Error(
        "Can not delete: Either feedback does not exist, or you didn't write it!"
      );
    }
    res.status(200).send("Deleted successfully!");
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
});
