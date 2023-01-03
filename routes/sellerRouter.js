import { Router } from "express";
import { User } from "../models/User.js";
import { BoughtCar } from "../models/BoughtCar.js";
import { Seller } from "../models/Seller.js";
export const sellerRouter = Router();
sellerRouter.get("/", async (req, res) => {
  //* get all sellers: admin mode only!
});
sellerRouter.post("/", async (req, res) => {
  try {
    const { passportID, phoneNumber, saleDate, carID, role } = req.body;
    let sellerRes = await Seller.findOneAndUpdate(
      {
        $or: [{ passportID }, { phoneNumbers: { $in: [phoneNumber] } }],
      },
      {
        $addToSet: { soldCars: { saleDate, carID, role } },
        $addToSet: { phoneNumbers: phoneNumber },
      },
      { new: true }
    );
    if (!sellerRes) {
      sellerRes = await Seller.create({
        passportID,
        phoneNumbers: [phoneNumber],
        soldCars: [{ carID, role, saleDate }],
      });
    }
    res.status(201).send(`seller record added successfully`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
sellerRouter.post("/find_one", async (req, res) => {
  //* get specific seller info: logged(authorized) mode only!
  try {
    const { passportID, phoneNumber } = req.body;
    const seller = await Seller.findOne({
      $or: [{ passportID }, { phoneNumbers: { $in: [phoneNumber] } }],
    })?.populate("soldCars.carID");
    if (!seller) {
      return res
        .status(404)
        .send(
          `The person with passport ID ${passportID} or with phone number ${phoneNumber} does not exist in our sellers database.`
        );
    }
    const result = {
      passportID: seller.passportID,
      phoneNumbers: seller.phoneNumbers,
      soldCars: seller.soldCars
        .map((rec) => ({
          brand: rec.carID.brand,
          model: rec.carID.model,
          saleDate: rec.saleDate,
          role: rec.role,
        }))
        .sort((a, b) => b.saleDate - a.saleDate),
    };
    res.status(200).json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
});
