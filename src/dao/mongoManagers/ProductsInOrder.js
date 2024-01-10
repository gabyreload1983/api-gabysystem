import productsInOrderModel from "./models/productsInOrder.js";

export default class ProductsInOrder {
  constructor() {}

  create = async (data) => await productsInOrderModel.create(data);
}
