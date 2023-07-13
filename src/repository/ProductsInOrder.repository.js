export default class ProductsInOrderRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (data) => await this.dao.create(data);
}
