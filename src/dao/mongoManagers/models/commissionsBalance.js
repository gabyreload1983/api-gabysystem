import mongoose from "mongoose";

const commissionsBalanceCollection = "commissionsBalance";

const commissionsBalanceSchema = new mongoose.Schema(
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

const commissionsBalanceModel = mongoose.model(
  commissionsBalanceCollection,
  commissionsBalanceSchema
);

export default commissionsBalanceModel;
