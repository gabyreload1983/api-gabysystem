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

  create = async (subscriber) => await this.dao.create(subscriber);

  update = async (id, subscriber) => await this.dao.update(id, subscriber);

  remove = async (id) => await this.dao.remove(id);
}
