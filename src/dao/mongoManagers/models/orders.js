import mongoose from "mongoose";

const orderCollection = "orders";

const ordersSchema = new mongoose.Schema({
  nrocompro: {
    type: String,
    unique: true,
  },
  saleNote: {
    type: String,
    unique: true,
  },
  saleNotePosition: String,
  saleNoteNumber: {
    type: String,
  },
  state: Number,
  diagnosis: Number,
  ubication: Number,
  dateIn: Date,
  tier: Number,
  description: String,
  accessories: String,
  saler: String,
  technical: String,
  failure: String,
  diagnosisTechnical: String,
  price: Number,
  total: Number,
  dateOut: Date,
  orderProducts: Array,
});

const orderModel = mongoose.model(orderCollection, ordersSchema);

export default orderModel;
