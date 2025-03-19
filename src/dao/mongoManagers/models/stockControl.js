import mongoose from "mongoose";

const stockControlCollection = "stockControl";

const stockControlSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantitySystem: {
      type: Number,
      required: true,
    },
    quantityReal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const stockControlModel = mongoose.model(
  stockControlCollection,
  stockControlSchema
);

export default stockControlModel;
