import mongoose from "mongoose";

const replacementsCollection = "replacements";

const replacementsSchema = new mongoose.Schema(
  {
    requests: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
      default: "",
    },
    supplier: {
      type: String,
      default: "",
    },
    cost: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
    delay: {
      type: Number,
      default: 0,
    },
    customerConfirmation: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
    },
    linkSupplier: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const replacementsModel = mongoose.model(
  replacementsCollection,
  replacementsSchema
);

export default replacementsModel;
