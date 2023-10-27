import logger from "../../logger/logger.js";
import orderModel from "./models/orders.js";

export default class Orders {
  constructor() {
    logger.info("Working Orders with DB in mongoDB");
  }

  getOrder = async (oid) => await orderModel.findOne({ _id: oid });

  getOrders = async () => await orderModel.find();

  getByNrocompro = async (nrocompro) => await orderModel.findOne({ nrocompro });

  getBySaleNoteNumber = async (saleNoteNumber) =>
    await orderModel.findOne({ saleNoteNumber });

  create = async (order) => await orderModel.create(order);

  update = async (oid, order) =>
    await orderModel.updateOne({ _id: oid }, order);

  delete = async (oid) => await orderModel.deleteOne({ _id: oid });
}
