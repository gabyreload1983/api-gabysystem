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
    type: {
      type: String,
    },
    purchaseOrder: {
      type: String,
      default: "",
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
      default: 0,
    },
    delivery: {
      type: String,
      default: "",
    },
    deliveryState: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Number,
    },
    profit: {
      type: Number,
    },
    invoiceState: {
      type: String,
      default: "pending",
    },
    paymentDate: {
      type: Date,
      default: "",
    },
    saler: {
      type: String,
    },
    cameFrom: {
      type: String,
    },
    isProfitApply: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const salesCommissionModel = mongoose.model(
  salesCommissionCollection,
  salesCommissionSchema
);

export default salesCommissionModel;
