export default class CustomersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getByCode = async (codigo) => await this.dao.getByCode(codigo);

  getByName = async (description) => await this.dao.getByName(description);

  getCustomers = async () => await this.dao.getCustomers();

  getSubscribers = async () => await this.dao.getSubscribers();

  addSubscriber = async (code) => await this.dao.addSubscriber(code);

  removeSubscription = async (code) => await this.dao.removeSubscription(code);

  getCustomersVouchers = async (id) => await this.dao.getCustomersVouchers(id);

  getSalesConditions = async () => await this.dao.getSalesConditions();
}
