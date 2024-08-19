import subscribersModel from "./models/subscribers.js";

export default class Subscribers {
  constructor() {}

  getSubscriber = async (id) => await subscribersModel.findOne({ _id: id });

  getSubscriberByCode = async (code) =>
    await subscribersModel.findOne({ code });

  getSubscriberByEmail = async (email) =>
    await subscribersModel.findOne({ email });

  getSubscribers = async () => await subscribersModel.find();

  create = async (subscriber) => await subscribersModel.create(subscriber);

  update = async (id, subscriber) =>
    await subscribersModel.updateOne({ _id: id }, subscriber);

  remove = async (id) => await subscribersModel.deleteOne({ _id: id });
}
