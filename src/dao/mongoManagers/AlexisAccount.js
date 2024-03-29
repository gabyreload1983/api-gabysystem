import alexisAccountModel from "./models/alexisAcount.js";

export default class AlexisAccount {
  constructor() {}

  getAll = async () => await alexisAccountModel.find();

  getAllFrom = async (year) =>
    await alexisAccountModel.find({
      yearApply: year,
    });

  create = async (item) => await alexisAccountModel.create(item);

  findById = async (_id) => await alexisAccountModel.findById({ _id });

  findByInternalId = async (internalId) =>
    await alexisAccountModel.findOne({ internalId });

  update = async (_id, item) =>
    await alexisAccountModel.updateOne({ _id }, item);

  remove = async (_id) => await alexisAccountModel.deleteOne({ _id });
}
