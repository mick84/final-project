import { set, Schema, model } from "mongoose";
set("strictQuery", true);

const sellerSchema = new Schema({
  passportID: {
    type: String,
    required: true,
  },
  phoneNumbers: {
    type: [String],
    required: true,
  },
  soldCars: [
    {
      carID: { type: Schema.Types.ObjectId, ref: "BoughtCar", required: true },
      role: { type: String, required: true, enum: ["seller", "owner"] },
      saleDate: { type: Date, required: true },
    },
  ],
});
export const Seller = model("Seller", sellerSchema);
