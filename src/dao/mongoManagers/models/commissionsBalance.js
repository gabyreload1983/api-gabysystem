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
    value: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
    },
    numberId: {
      type: String,
    },
  },
  { timestamps: true }
);

const commissionsBalanceModel = mongoose.model(
  commissionsBalanceCollection,
  commissionsBalanceSchema
);

export default commissionsBalanceModel;
