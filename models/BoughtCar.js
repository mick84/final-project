import { set, Schema, model } from "mongoose";
set("strictQuery", true);
//This is form, that user can fill, when bought a car
const carSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  VIN: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  ownershipRecords: [
    {
      ownershipDate: { type: Date, required: true },
      ownerID: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    },
  ],
});
export const BoughtCar = model("BoughtCar", carSchema);
