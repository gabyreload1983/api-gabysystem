export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getByCode = async (code, stock) => this.dao.getByCode(code, stock);

  getByEan = async (ean, stock) => this.dao.getByEan(ean, stock);

  getByDescription = async (description, stock) =>
    this.dao.getByDescription(description, stock);

  getDollarValue = async () => this.dao.getDollarValue();
}
