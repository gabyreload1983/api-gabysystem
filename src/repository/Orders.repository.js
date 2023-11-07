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

  getProcessSector = async (sector) => {
    const orders = await this.dao.getProcessSector(sector);
    return await this.#addingProductsInOrders(orders);
  };

  getPendings = async (sector) => {
    const pendings = await this.dao.getPendings(sector);
    return await this.#addingProductsInOrders(pendings);
  };

  getPendingsAll = async () => {
    const pendings = await this.dao.getPendingsAll();
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

  getOrders = async (from, to) => {
    const orders = await this.dao.getOrders(from, to);
    return await this.#addingProductsInOrders(orders);
  };

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

  free = async (nrocompro) => await this.dao.free(nrocompro);

  out = async (nrocompro) => await this.dao.out(nrocompro);

  savePdfPath = async (nrocompro, path) =>
    await this.dao.savePdfPath(nrocompro, path);

  updateCustomer = async (nrocompro, customer) =>
    await this.dao.updateCustomer(nrocompro, customer);

  updateCustomerInProducts = async (nrocompro, customer) =>
    await this.dao.updateCustomerInProducts(nrocompro, customer);

  create = async (order) => await this.dao.create(order);

  getLastSaleNoteNumber = async (position) => {
    const lastSaleNoteNumber = await this.dao.getLastSaleNoteNumber(position);
    return lastSaleNoteNumber[0].nrocompro === null
      ? 0
      : lastSaleNoteNumber[0].nrocompro;
  };

  getLastItem = async (nrocompro) => {
    const result = await this.dao.getLastItem(nrocompro);
    return result[0].lastItem === null ? 0 : result[0].lastItem;
  };

  createSaleNoteReservation = async (orderMongo, product, itemNumber) =>
    await this.dao.createSaleNoteReservation(orderMongo, product, itemNumber);

  createSaleNote = async (order, saleNote, saleNotePosition, saleNoteNumber) =>
    await this.dao.createSaleNote(
      order,
      saleNote,
      saleNotePosition,
      saleNoteNumber
    );

  removeSaleNoteReservation = async (saleNote, product) =>
    await this.dao.removeSaleNoteReservation(saleNote, product);
}
