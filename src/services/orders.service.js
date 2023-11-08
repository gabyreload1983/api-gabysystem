import moment from "moment";
import Customers from "../dao/sqlManager/Customers.js";
import Products from "../dao/sqlManager/Products.js";
import OrdersRepository from "../repository/Orders.repository.js";
import Orders from "../dao/sqlManager/Orders.js";
import sendMail from "./../nodemailer/config.js";
import ProductsRepository from "./../repository/Products.repository.js";
import CustomersRepository from "./../repository/Customers.repository.js";
import {
  getHtmlCloseOrder,
  getHtmlProductsInOrder,
} from "./../nodemailer/html/utilsHtml.js";
import { getSaleNoteString, formatProduct, getTotalOrder } from "../utils.js";
import { nanoid } from "nanoid";
import Users from "./../dao/mongoManagers/Users.js";
import UsersRepository from "./../repository/Users.repository.js";
import { buildOrderPdf } from "../pdfKit/pdfKit.js";
import ProductsInOrder from "./../dao/mongoManagers/ProductsInOrder.js";
import ProductsInOrderRepository from "../repository/ProductsInOrder.repository.js";
import StatisticsTechnicalDto from "../dao/DTOs/StatisticsTechnical.dto.js";
import OrdersMongo from "../dao/mongoManagers/Orders.js";
import OrdersMongoRepository from "../repository/OrdersMongo.repository.js";
import config from "../config/config.js";

const orderMongoManager = new OrdersMongo();
const orderRepositoryMongo = new OrdersMongoRepository(orderMongoManager);
const orderManager = new Orders();
const orderRepository = new OrdersRepository(orderManager);
const productManager = new Products();
const productsRepository = new ProductsRepository(productManager);
const customersManager = new Customers();
const customersRepository = new CustomersRepository(customersManager);
const usersManager = new Users();
const usersRepository = new UsersRepository(usersManager);
const productsInOrderManager = new ProductsInOrder();
const productsInOrderRepository = new ProductsInOrderRepository(
  productsInOrderManager
);

export const getInProcess = async () => await orderRepository.getInProcess();

export const getToDeliver = async () => await orderRepository.getToDeliver();

export const getFinalDisposition = async () =>
  await orderRepository.getFinalDisposition();

export const getProcessSector = async (sector) =>
  await orderRepository.getProcessSector(sector);

export const getPendings = async (sector) =>
  await orderRepository.getPendings(sector);

export const getPendingsAll = async () =>
  await orderRepository.getPendingsAll();

export const getInProgressByTechnical = async (code_technical) =>
  await orderRepository.getInProgressByTechnical(code_technical);

export const getOrder = async (nrocompro) => {
  let order = await orderRepository.getOrder(nrocompro);
  if (order.length === 0) return null;
  order = order[0];
  const customer = await customersRepository.getByCode(order.codigo);
  if (customer && customer.length > 0) order.telefono = customer[0].telefono;

  const dollar = await productsRepository.getDollarValue();

  order.products = order.products.map((product) =>
    formatProduct(product, dollar)
  );
  order.total = getTotalOrder(order);

  return order;
};

export const getStatistics = async (from, to) => {
  const technicals = await orderRepository.getTechnicals(from, to);
  if (technicals.length === 0) return [];
  const statistics = technicals.map(
    (technical) => new StatisticsTechnicalDto(technical.code_technical)
  );

  const orders = await orderRepository.getOrders(from, to);
  const dollar = await productsRepository.getDollarValue();
  for (const order of orders) {
    order.products = order.products.map((product) =>
      formatProduct(product, dollar)
    );
    order.total = getTotalOrder(order);

    const technical = statistics.find(
      (tech) => tech.code_technical === order.tecnico
    );
    technical.orders.push(order);
    technical.total += 1;
    if (order.diag === 22 && order.prioridad !== 3) technical.finished += 1;
    if (order.diag === 23) technical.withoutRepair += 1;
    if (order.prioridad === 3) technical.assembly += 1;
  }

  return statistics;
};

export const getOrdersByCustomer = async (code) =>
  await orderRepository.getOrdersByCustomer(code);

export const take = async (order, code_technical) => {
  const result = await orderRepository.take(order.nrocompro, code_technical);
  if (!result) return false;
  const orderUpdate = await getOrder(order.nrocompro);

  return await createOrdenMongo(orderUpdate);
};

export const update = async (nrocompro, diagnostico, costo, code_technical) =>
  await orderRepository.update(nrocompro, diagnostico, costo, code_technical);

export const close = async (
  nrocompro,
  diagnostico,
  costo,
  code_technical,
  diag,
  notification
) => {
  const result = await orderRepository.close(
    nrocompro,
    diagnostico,
    costo,
    code_technical,
    diag
  );
  const orderUpdate = await getOrder(nrocompro);
  const orderMongo = await createOrdenMongo(orderUpdate);
  await orderRepositoryMongo.update(orderMongo._id, orderUpdate);

  if (notification) {
    const customer = await customersRepository.getByCode(orderUpdate.codigo);
    if (!customer[0].mail) return result;

    const html = getHtmlCloseOrder(nrocompro);
    const info = await sendMail(
      customer[0].mail,
      "ORDEN REPARACION",
      "Notificacion Servicio Tecnico",
      html
    );
    result.email = info;
  }
  return result;
};

export const free = async (nrocompro) => await orderRepository.free(nrocompro);

export const out = async (order) => {
  if (order.products.length > 0) {
    for (const product of order.products) {
      await productsRepository.removeReservation(product.codigo);
    }
  }
  const result = await orderRepository.out(order.nrocompro);

  const orderMongo = await orderRepositoryMongo.getByNrocompro(order.nrocompro);
  if (orderMongo) {
    await orderRepository.cancelSaleNoteReservation(orderMongo.saleNote);

    const orderUpdate = await getOrder(order.nrocompro);
    await orderRepositoryMongo.update(orderMongo._id, orderUpdate);
  }
  return result;
};

export const handleProductsInOrder = async (order, user) => {
  for (const p of order.products) {
    if (!p.serie) p.serie = nanoid();
  }
  const oldOrder = await getOrder(order.nrocompro);
  const orderMongo = await createOrdenMongo(oldOrder);

  const addedProducts = order.products.filter((product) => {
    return !oldOrder.products.some(
      (p) => p.codigo === product.codigo && p.serie === product.serie
    );
  });

  const deletedProducts = oldOrder.products.filter((product) => {
    return !order.products.some(
      (p) => p.codigo === product.codigo && p.serie === product.serie
    );
  });

  if (addedProducts.length > 0) {
    const lastItem = await orderRepository.getLastItem(orderMongo.saleNote);
    let itemNumber = lastItem + 1;
    for (const product of addedProducts) {
      await orderRepository.createSaleNoteReservation(
        orderMongo,
        product,
        itemNumber
      );
      itemNumber++;

      await productsRepository.addReservation(product.codigo);
      await productsRepository.addProductIntoOrder(order, product);
    }
  }

  if (deletedProducts.length > 0) {
    for (const product of deletedProducts) {
      await orderRepository.removeSaleNoteReservation(
        orderMongo.saleNote,
        product
      );

      await productsRepository.removeReservation(product.codigo);
      await productsRepository.removeProductFromOrder(order, product);
    }
  }

  // update orderMongo
  const updateOrder = await getOrder(order.nrocompro);
  await orderRepositoryMongo.update(orderMongo._id, updateOrder);

  const technical = await usersRepository.getByCode(order.tecnico);
  let fileName = "";
  const now = moment();

  if (order.products.length === 0) {
    await sendMail(
      technical.email,
      `ORDEN DE REPARACIÓN - ${order.nrocompro}`,
      `Actualizacion Orden`,
      getHtmlProductsInOrder(user, order),
      null,
      user.email
    );
  }

  if (order.products.length > 0) {
    const result = buildOrderPdf(order, user, now);
    fileName = result.fileName;

    await orderRepository.savePdfPath(order.nrocompro, fileName);

    await sendMail(
      technical.email,
      `ORDEN DE REPARACIÓN - ${order.nrocompro}`,
      `Actualizacion Orden`,
      getHtmlProductsInOrder(user, order),
      result.pdfPath,
      user.email
    );
  }

  const data = {
    userEmail: user.email,
    technicalEmail: technical.email,
    order: order.nrocompro,
    orderProducts: order.products,
    addedProducts,
    deletedProducts,
    pdfName: fileName,
    date: now,
  };
  const result = await productsInOrderRepository.create(data);

  return { result, fileName };
};

export const updateCustomer = async (nrocompro, customer) => {
  await orderRepository.updateCustomer(nrocompro, customer);
  await orderRepository.updateCustomerInProducts(nrocompro, customer);
  return true;
};

export const createOrdenMongo = async (order) => {
  let orderMongo = await orderRepositoryMongo.getByNrocompro(order.nrocompro);

  if (orderMongo) return orderMongo;

  // create NV
  const lastSaleNoteNumber = await orderRepository.getLastSaleNoteNumber(
    config.sale_note_position
  );
  const saleNoteNumber = lastSaleNoteNumber + 1;
  const saleNote = getSaleNoteString(saleNoteNumber, config.sale_note_position);

  await orderRepository.createSaleNote(
    order,
    saleNote,
    config.sale_note_position,
    saleNoteNumber
  );

  //save order in mongo
  orderMongo = await orderRepositoryMongo.create(
    order,
    saleNote,
    config.sale_note_position,
    saleNoteNumber
  );

  if (order.products.length > 0) {
    const lastItem = await orderRepository.getLastItem(orderMongo.saleNote);
    let itemNumber = lastItem + 1;
    for (const product of order.products) {
      orderRepository.createSaleNoteReservation(
        orderMongo,
        product,
        itemNumber
      );
      itemNumber++;
    }
  }
  return orderMongo;
};
