import OrderUrbanoDto from "../dao/DTOs/OrderUrbano.dto.js";
import OrderUrbanoUpdateDto from "../dao/DTOs/OrderUrbanoUpdate.dto.js";

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

  getInProcess = async () => await this.dao.getInProcess();

  getToDeliver = async () => await this.dao.getToDeliver();

  getFinalDisposition = async () => await this.dao.getFinalDisposition();

  getProcessSector = async (sector) => await this.dao.getProcessSector(sector);

  getPendings = async (sector) => await this.dao.getPendings(sector);

  getPendingsAll = async () => await this.dao.getPendingsAll();

  getInProgressByTechnical = async (code_technical) =>
    await this.dao.getInProgressByTechnical(code_technical.toUpperCase());

  getOrder = async (nrocompro) => {
    const order = await this.dao.getById(nrocompro);
    return await this.#addingProductsInOrders(order);
  };

  getOrdersWithProducts = async (from, to, filter) => {
    const orders = await this.dao.getOrders(from, to, filter);
    return await this.#addingProductsInOrders(orders);
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

  free = async (nrocompro) => await this.dao.free(nrocompro);

  out = async (nrocompro) => await this.dao.out(nrocompro);

  updateCustomer = async (nrocompro, customer) =>
    await this.dao.updateCustomer(nrocompro, customer);

  updateCustomerInProducts = async (nrocompro, customer) =>
    await this.dao.updateCustomerInProducts(nrocompro, customer);

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

  cancelSaleNoteReservation = async (saleNote) =>
    await this.dao.cancelSaleNoteReservation(saleNote);

  getLastOrderNumber = async () => {
    const ORDER_POSITION = process.env.ORDER_POSITION;
    const result = await this.dao.getLastOrderNumber(ORDER_POSITION);
    return result[0].numero;
  };

  updateLastOrderNumber = async (lastNumber) => {
    const ORDER_POSITION = process.env.ORDER_POSITION;
    return await this.dao.updateLastOrderNumber(ORDER_POSITION, lastNumber);
  };

  create = async (newOrder) =>
    await this.dao.create(new OrderUrbanoDto(newOrder));

  updateOrder = async ({ nrocompro, order }) => {
    const orderDto = new OrderUrbanoUpdateDto(order);
    return await this.dao.updateOrder(nrocompro, orderDto);
  };
}
