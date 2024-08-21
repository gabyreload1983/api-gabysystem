import OrderUrbanoDto from "../dao/DTOs/OrderUrbano.dto.js";
import OrderUrbanoUpdateDto from "../dao/DTOs/OrderUrbanoUpdate.dto.js";
import { getNroComproString, getSaleNoteString } from "../utils.js";

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

  //TODO return a single object
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

  take = async (nrocompro, code_technical, cost) =>
    await this.dao.take(nrocompro, code_technical, cost);

  updateDiagnosis = async ({ nrocompro, diagnosis, user }) =>
    await this.dao.updateDiagnosis({
      nrocompro,
      diagnosis,
      code_technical: user.code_technical,
    });

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

  out = async ({ user, nrocompro }) => await this.dao.out({ user, nrocompro });

  updateCustomer = async (nrocompro, customer) =>
    await this.dao.updateCustomer(nrocompro, customer);

  updateCustomerInProducts = async (nrocompro, customer) =>
    await this.dao.updateCustomerInProducts(nrocompro, customer);

  getLastItem = async (nrocompro) => {
    const result = await this.dao.getLastItem(nrocompro);
    return result[0].lastItem === null ? 0 : result[0].lastItem;
  };

  createSaleNoteReservation = async (saleNote, order, product, itemNumber) => {
    const position = process.env.SALE_NOTE_POSITION;
    const saleNoteNumber = await this.getLastNumberTable(position, "NV");
    return await this.dao.createSaleNoteReservation(
      saleNote,
      position,
      saleNoteNumber,
      order,
      product,
      itemNumber
    );
  };

  createSaleNote = async ({ order }) => {
    const SALE_NOTE_POSITION = process.env.SALE_NOTE_POSITION;

    const lastSaleNoteNumber = await this.getLastNumberTable(
      SALE_NOTE_POSITION,
      "NV"
    );
    const saleNoteNumber = lastSaleNoteNumber + 1;
    const saleNote = getSaleNoteString(saleNoteNumber, SALE_NOTE_POSITION);

    await this.dao.createSaleNote(
      order,
      saleNote,
      SALE_NOTE_POSITION,
      saleNoteNumber
    );
    return await this.updateLastNumberTable(
      process.env.SALE_NOTE_POSITION,
      "NV"
    );
  };

  getSaleNoteNumber = async (nroOrder) => {
    const res = await this.dao.getSaleNoteNumber(nroOrder);
    if (res?.length > 0) return res[0].nrocompro;
    return false;
  };

  removeSaleNoteReservation = async (saleNote, product) =>
    await this.dao.removeSaleNoteReservation(saleNote, product);

  cancelSaleNoteReservation = async (saleNote) =>
    await this.dao.cancelSaleNoteReservation(saleNote);

  getLastNumberTable = async (position, tipo) => {
    const result = await this.dao.getLastNumberTable(position, tipo);
    return result[0].numero;
  };

  updateLastNumberTable = async (position, tipo) =>
    await this.dao.updateLastNumberTable(position, tipo);

  create = async (order) => {
    const lastOrderNumber = await this.getLastNumberTable(
      process.env.ORDER_POSITION,
      "OR"
    );

    const nextNrocompro = getNroComproString(lastOrderNumber + 1);
    const orderToCreate = { ...order, nrocompro: nextNrocompro };

    await this.dao.create(new OrderUrbanoDto(orderToCreate));
    return await this.updateLastNumberTable(process.env.ORDER_POSITION, "OR");
  };

  updateOrder = async ({ nrocompro, order }) => {
    const orderDto = new OrderUrbanoUpdateDto(order);
    return await this.dao.updateOrder(nrocompro, orderDto);
  };
}
