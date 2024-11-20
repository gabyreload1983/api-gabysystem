import mongoose from "mongoose";

const replacementsCollection = "replacements";

const replacementsSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
    },
    technical_code: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: String,
    },
    supplier_code: {
      type: String,
    },
    supplier: {
      type: String,
    },
    cost: {
      type: Number,
    },
    finalPrice: {
      type: Number,
    },
    delay: {
      type: Number,
    },
    shipmment: {
      type: String,
    },
    customerConfirmation: {
      type: Boolean,
    },
    status: {
      type: String,
    },
    linkSupplier: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const replacementsModel = mongoose.model(
  replacementsCollection,
  replacementsSchema
);

export default replacementsModel;
