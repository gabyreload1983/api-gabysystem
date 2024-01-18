import alexisAccountModel from "./models/alexisAcount.js";

export default class AlexisAccount {
  constructor() {}

  getAll = async () => await alexisAccountModel.find();

  getAllFromTo = async (from, to) =>
    await alexisAccountModel.find({
      date: {
        $gte: from,
        $lte: to,
      },
    });

  create = async (item) => await alexisAccountModel.create(item);

  findById = async (_id) => await alexisAccountModel.findById({ _id });

  findByInternalId = async (internalId) =>
    await alexisAccountModel.findOne({ internalId });

  update = async (_id, item) =>
    await alexisAccountModel.updateOne({ _id }, item);

  delete = async (_id) => await alexisAccountModel.deleteOne({ _id });
}
