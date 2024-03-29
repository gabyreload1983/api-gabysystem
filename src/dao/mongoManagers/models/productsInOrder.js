import mongoose from "mongoose";

const productsInOrderCollection = "products_in_order";

const productsInOrderSchema = new mongoose.Schema({
  userEmail: String,
  technicalEmail: String,
  order: String,
  orderProducts: Array,
  addedProducts: Array,
  deletedProducts: Array,
  pdfName: String,
  date: Date,
});

const productsInOrderModel = mongoose.model(
  productsInOrderCollection,
  productsInOrderSchema
);

export default productsInOrderModel;
