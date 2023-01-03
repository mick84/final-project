import { Router } from "express";
import { User } from "../models/User.js";
import { BoughtCar } from "../models/BoughtCar.js";
export const carRouter = Router();
carRouter.post("/", async (req, res) => {
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
