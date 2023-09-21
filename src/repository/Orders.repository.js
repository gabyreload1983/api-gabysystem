export default class OrdersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  #addingProductsInOrders = async (orders) => {
    for (let order of orders) {
      order.products = await this.dao.getProductsInOrder(order.nrocompro);
    }
    return orders;
  };

  getInProcess = async () => {
    const inProcess = await this.dao.getInProcess();
    return await this.#addingProductsInOrders(inProcess);
  };

  getToDeliver = async () => {
    const toDeliver = await this.dao.getToDeliver();
    return await this.#addingProductsInOrders(toDeliver);
  };

  getFinalDisposition = async () => {
    const finalDisposition = await this.dao.getFinalDisposition();
    return await this.#addingProductsInOrders(finalDisposition);
  };

  getPendings = async (sector) => {
    const pendings = await this.dao.getPendings(sector);
    return await this.#addingProductsInOrders(pendings);
  };

  getInProgressByTechnical = async (code_technical) => {
    const ordersTechnical = await this.dao.getInProgressByTechnical(
      code_technical.toUpperCase()
    );
    return await this.#addingProductsInOrders(ordersTechnical);
  };

  getOrder = async (nrocompro) => {
    const order = await this.dao.getById(nrocompro);
    return await this.#addingProductsInOrders(order);
  };

  getOrders = async (from, to) => await this.dao.getOrders(from, to);

  getTechnicals = async (from, to) => await this.dao.getTechnicals(from, to);

  getOrdersByCustomer = async (code) =>
    await this.dao.getOrdersByCustomer(code);

  take = async (nrocompro, code_technical) =>
    await this.dao.take(nrocompro, code_technical);

  update = async (nrocompro, diagnostico, costo, code_technical) =>
    await this.dao.update(nrocompro, diagnostico, costo, code_technical);

  close = async (
    nrocompro,
    diagnostico,
    costo,
    code_technical,
    diag,
    notification
  ) =>
    await this.dao.close(
      nrocompro,
      diagnostico,
      costo,
      code_technical,
      diag,
      notification
    );

  free = async (nrocompro) => this.dao.free(nrocompro);

  out = async (nrocompro) => this.dao.out(nrocompro);

  savePdfPath = async (nrocompro, path) =>
    this.dao.savePdfPath(nrocompro, path);
}
