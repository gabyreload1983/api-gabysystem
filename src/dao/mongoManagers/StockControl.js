import stockControlModel from "./models/stockControl.js";

export default class StockControl {
  constructor() {}

  getStockControl = async (id) => await stockControlModel.findOne({ _id: id });

  getStockControlByCode = async (code) =>
    await stockControlModel.findOne({ code });

  getStockControlsByStatus = async ({ status }) =>
    await stockControlModel.find({ status });

  getStockControls = async () => await stockControlModel.find();

  create = async (stockControl) => await stockControlModel.create(stockControl);

  update = async (id, stockControl) =>
    await stockControlModel.updateOne({ _id: id }, stockControl);

  remove = async (id) => await stockControlModel.deleteOne({ _id: id });
}
