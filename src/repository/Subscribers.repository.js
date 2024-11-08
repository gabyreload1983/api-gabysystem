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

  getEquipmentById = async (id) => {
    const data = await this.dao.getEquipmentById(id);
    if (!data || data?.equipments.length === 0) return;

    return data?.equipments[0];
  };

  getEquipmentByUUID = async (uuid) => {
    const data = await this.dao.getEquipmentByUUID(uuid);
    if (!data || data?.equipments.length === 0) return;

    return data?.equipments[0];
  };

  updateEquipmentById = async (id, updatedEquipment) =>
    await this.dao.updateEquipmentById(id, updatedEquipment);

  removeEquipmentById = async (id) => await this.dao.removeEquipmentById(id);

  update = async (id, subscriberUpdate) =>
    await this.dao.update(id, new SubscriberUpdateDto(subscriberUpdate));

  remove = async (id) => await this.dao.remove(id);
}
