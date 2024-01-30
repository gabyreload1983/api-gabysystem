import mongoose from "mongoose";

const alexisAccountCollection = "alexis_account";

const alexisAccountSchema = new mongoose.Schema(
  {
    internalId: {
      type: String,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    observation: {
      type: String,
    },
  },
  { timestamps: true }
);

const alexisAccountModel = mongoose.model(
  alexisAccountCollection,
  alexisAccountSchema
);

export default alexisAccountModel;
