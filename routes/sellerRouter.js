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
    res.status(201).send(`Record added successfully`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
sellerRouter.get("/:passportID", async (req, res) => {
  //* get specific seller info: logged(authorized) mode only!
  try {
    const { passportID}= req.params;
    const seller = await Seller.findOne(
     { passportID 
    })?.populate("soldCars.carID");
    if (!seller) {
      throw new Error(
        `The person with passport ID ${passportID} or with phone number ${phoneNumber} does not exist in our sellers database.`
      );
    }
    const result = {
      passportID: seller.passportID,
      soldCars: seller.soldCars
        .map((rec) => ({
          brand: rec.carID.brand,
          model: rec.carID.model,
          saleDate: rec.saleDate,
          role: rec.role,
        }))
        .sort((a, b) => b.saleDate - a.saleDate),
    };
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
