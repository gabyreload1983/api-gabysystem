import moment from "moment";
import commissionsBalanceModel from "./models/commissionsBalance.js";

export default class CommissionsBalance {
  constructor() {}

  getAll = async () => await commissionsBalanceModel.find();

  getAllFromTo = async (from, to) => {
    try {
      const result = await commissionsBalanceModel.find({
        date: {
          $gte: from,
          $lte: to,
        },
      });

      console.log("result", result); // Verificar los resultados en la consola

      return result;
    } catch (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }
  };

  create = async (item) => await commissionsBalanceModel.create(item);

  findById = async (_id) => await commissionsBalanceModel.findById({ _id });

  findByInvoiceId = async (invoiceId) =>
    await commissionsBalanceModel.findOne({ invoiceId });

  update = async (_id, item) =>
    await commissionsBalanceModel.updateOne({ _id }, item);

  delete = async (_id) => await commissionsBalanceModel.deleteOne({ _id });
}
