import commissionsBalanceModel from "./models/commissionsBalance.js";

export default class CommissionsBalance {
  constructor() {}

  getAll = async () => await commissionsBalanceModel.find();

  create = async (item) => await commissionsBalanceModel.create(item);

  findById = async (_id) => await commissionsBalanceModel.findById({ _id });

  findByNumberId = async (numberId) =>
    await commissionsBalanceModel.findOne({ numberId });

  update = async (_id, item) =>
    await commissionsBalanceModel.updateOne({ _id }, item);

  delete = async (_id) => await commissionsBalanceModel.deleteOne({ _id });
}
