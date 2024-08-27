export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getByCode = async (code, stock) => await this.dao.getByCode(code, stock);

  getByEan = async (ean, stock) => await this.dao.getByEan(ean, stock);

  getByDescription = async (description, stock) =>
    await this.dao.getByDescription(description, stock);

  getBySerie = async (serie) => {
    const response = await this.dao.getBySerie(serie);
    if (!response) return;
    return response.length === 0 ? null : response[0];
  };

  getOrderList = async () => await this.dao.getOrderList();

  clearOrderList = async () => await this.dao.clearOrderList();

  deleteProductOrderList = async (id) =>
    await this.dao.deleteProductOrderList(id);

  getDollarValue = async () => await this.dao.getDollarValue();

  removeReservation = async (codigo) =>
    await this.dao.removeReservation(codigo);

  removeProductFromOrder = async (order, product) =>
    await this.dao.removeProductFromOrder(order, product);

  addReservation = async (codigo) => await this.dao.addReservation(codigo);

  addProductIntoOrder = async (order, product) =>
    await this.dao.addProductIntoOrder(order, product);
}
