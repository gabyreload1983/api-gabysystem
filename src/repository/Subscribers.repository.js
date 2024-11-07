import SubscriberCreateDto from "../dao/DTOs/SubscriberCreate.dto.js";
import SubscriberUpdateDto from "../dao/DTOs/SubscriberUpdate.dto.js";
export default class SubscribersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getSubscriber = async (id) => await this.dao.getSubscriber(id);

  getSubscriberByCode = async (code) =>
    await this.dao.getSubscriberByCode(code);

  getSubscriberByEmail = async (email) =>
    await this.dao.getSubscriberByEmail(email);

  getSubscribers = async () => await this.dao.getSubscribers();

  create = async (subscriber) =>
    await this.dao.create(new SubscriberCreateDto(subscriber));

  addEquipment = async (subscriber, newEquipment) => {
    newEquipment.uuid = newEquipment.uuid.toLocaleUpperCase();

    const subscriberUpdate = {
      ...subscriber,
      equipments: [...subscriber.equipments, newEquipment],
    };

    return await this.dao.update(
      subscriber.id,
      new SubscriberUpdateDto(subscriberUpdate)
    );
  };

  update = async (id, subscriberUpdate) =>
    await this.dao.update(id, new SubscriberUpdateDto(subscriberUpdate));

  remove = async (id) => await this.dao.remove(id);
}
