import mongoose from "mongoose";

const salesCommissionCollection = "salesCommission";

const salesCommissionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    customerCode: {
      type: String,
    },
    customer: {
      type: String,
    },
    invoiceId: {
      type: String,
      unique: true,
      required: true,
    },
    purchaseOrder: {
      type: String,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    deliveryCost: {
      type: Number,
    },
    delivery: {
      type: String,
    },
    deliveryState: {
      type: String,
    },
    cost: {
      type: Number,
    },
    profit: {
      type: Number,
    },
    stateInvoice: {
      type: String,
    },
    paymentDate: {
      type: String,
    },
    saler: {
      type: String,
    },
  },
  { timestamps: true }
);

const salesCommissionModel = mongoose.model(
  salesCommissionCollection,
  salesCommissionSchema
);

export default salesCommissionModel;
