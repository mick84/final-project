import { Router } from "express";
import { BoughtCar } from "../models/BoughtCar.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { requireAuth } from "../middleware/requireAuth.js";
import { fstat } from "fs";
export const carRouter = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "licenses");
  },
  filename: (req, file, cb) => `license_${req.userID}_${file.originalname}`,
});
const upload = multer({ storage });

carRouter.post("/", requireAuth, async (req, res) => {
  try {
    const { brand, model, VIN, licensePlate, ownershipDate, ownerID } =
      req.body;
    let car = await BoughtCar.findOneAndUpdate(
      { $or: [{ licensePlate }, { VIN }] },
      { $push: { ownershipRecords: { ownerID, ownershipDate } } },
      { new: true }
    );
    if (!car) {
      car = await BoughtCar.create({
        brand,
        model,
        licensePlate,
        VIN,
        ownershipRecords: [{ ownerID, ownershipDate }],
      });
      res.status(202).json({ carID: car._id });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
carRouter.post(
  "/license",
  requireAuth,
  upload.single("license"),

  async (req, res) => {
    try {
      console.log(req.file);
      console.log(req.name);

      if (req.file.mimetype !== "application/pdf") {
        console.log(
          path.resolve(
            "licenses",
            `license_${req.userID}_${req.file.originalname}`
          )
        );
        throw new Error("invalid format! Must be PDF only!");
      }
      res.status(200).send("ok");
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }

    //if(req.file.detectedFi)
  }
);
