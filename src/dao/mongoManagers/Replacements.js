import replacementsModel from "./models/replacements.js";

export default class Replacements {
  constructor() {}

  getReplacementById = async (id) =>
    await replacementsModel.findOne({ _id: id });

  getReplacementByOrderNumber = async (orderNumber) =>
    await replacementsModel.find({ orderNumber });

  getReplacements = async (archived) =>
    await replacementsModel.find({ archived: archived });

  create = async (replacement) => await replacementsModel.create(replacement);

  update = async (id, replacement) =>
    await replacementsModel.updateOne({ _id: id }, replacement);

  remove = async (id) => await replacementsModel.deleteOne({ _id: id });
}
