import commissionsModel from "./models/commissionsBalance.js";

export default class Commissions {
  constructor() {}

  getAll = async () => await commissionsModel.find();

  getAllFromTo = async (from, to) => {
    try {
      const result = await commissionsModel.find({
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

  create = async (item) => await commissionsModel.create(item);

  findById = async (_id) => await commissionsModel.findById({ _id });

  findByInvoiceId = async (invoiceId) =>
    await commissionsModel.findOne({ invoiceId });

  update = async (_id, item) => await commissionsModel.updateOne({ _id }, item);

  delete = async (_id) => await commissionsModel.deleteOne({ _id });
}
