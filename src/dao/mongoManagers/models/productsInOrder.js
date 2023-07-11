import mongoose from "mongoose";

const productsInOrderCollection = "productsinorder";

const productsInOrderSchema = new mongoose.Schema({
  userEmail: String,
  technicalEmail: String,
  order: String,
  orderProducts: Array,
  addedProducts: Array,
  deletedProducts: Array,
  pdfName: String,
});

const productsInOrderModel = mongoose.model(
  productsInOrderCollection,
  productsInOrderSchema
);

export default productsInOrderModel;
