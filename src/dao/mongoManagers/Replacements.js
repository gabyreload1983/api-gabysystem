import replacementsModel from "./models/replacements";

export default class Replacements {
  constructor() {}

  getReplacementById = async (id) => await Replacements.findOne({ _id: id });

  getReplacementByOrderNumber = async (orderNumber) =>
    await Replacements.findOne({ orderNumber });

  getReplacements = async () => await Replacements.find();

  create = async (replacement) => await Replacements.create(replacement);

  update = async (id, replacement) =>
    await Replacements.updateOne({ _id: id }, replacement);

  remove = async (id) => await Replacements.deleteOne({ _id: id });
}
