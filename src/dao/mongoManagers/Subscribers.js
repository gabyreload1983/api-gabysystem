import subscribersModel from "./models/subscribers.js";

export default class Subscribers {
  constructor() {}

  getSubscriber = async (id) => await subscribersModel.findOne({ _id: id });

  getSubscriberByCode = async (code) =>
    await subscribersModel.findOne({ code });

  getSubscriberByEmail = async (email) =>
    await subscribersModel.findOne({ email });

  getSubscribers = async () => await subscribersModel.find();

  getEquipmentById = async (id) =>
    await subscribersModel.findOne(
      { "equipments._id": id },
      { "equipments.$": 1 }
    );

  create = async (subscriber) => await subscribersModel.create(subscriber);

  update = async (id, subscriber) =>
    await subscribersModel.updateOne({ _id: id }, subscriber);

  updateEquipmentById = async (id, updatedEquipment) =>
    await subscribersModel.findOneAndUpdate(
      { "equipments._id": id },
      { $set: { "equipments.$[elem]": updatedEquipment } },
      {
        arrayFilters: [{ "elem._id": id }],
        new: true,
      }
    );

  removeEquipmentById = async (id) =>
    await subscribersModel.findOneAndUpdate(
      { "equipments._id": id },
      { $pull: { equipments: { _id: id } } },
      { new: true }
    );

  remove = async (id) => await subscribersModel.deleteOne({ _id: id });
}
