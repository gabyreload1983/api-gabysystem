import mongoose from "mongoose";

const commissionsCollection = "commissions";

const commissionsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    observation: {
      type: String,
    },
    invoiceId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const commissionsModel = mongoose.model(
  commissionsCollection,
  commissionsSchema
);

export default commissionsModel;
