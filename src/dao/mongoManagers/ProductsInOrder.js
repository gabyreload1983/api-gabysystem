import logger from "../../logger/logger.js";
import productsInOrderModel from "./models/productsInOrder.js";

export default class ProductsInOrder {
  constructor() {
    logger.info("Working ProductsInOrder with DB in mongoDB");
  }

  create = async (data) => await productsInOrderModel.create(data);
}
