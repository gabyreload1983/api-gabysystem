import salesCommissionModel from "./models/salesCommission.js";

export default class SalesCommission {
  constructor() {}

  getAll = async (from, to) =>
    await salesCommissionModel.find({
      date: {
        $gte: from,
        $lte: to,
      },
    });

  getFilter = async (filter) => await salesCommissionModel.find(filter);

  create = async (invoice) => await salesCommissionModel.create(invoice);

  findById = async (_id) => await salesCommissionModel.findById({ _id });

  findByInvoiceId = async (invoiceId) =>
    await salesCommissionModel.findOne({ invoiceId });

  update = async (_id, invoice) =>
    await salesCommissionModel.updateOne({ _id }, invoice);

  delete = async (_id) => await salesCommissionModel.deleteOne({ _id });
}
