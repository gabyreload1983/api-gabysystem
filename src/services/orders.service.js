import Customers from "../dao/sqlManager/Customers.js";
import Products from "../dao/sqlManager/Products.js";
import OrdersRepository from "../repository/Orders.repository.js";
import Orders from "../dao/sqlManager/Orders.js";
import sendMail from "./../nodemailer/config.js";
import ProductsRepository from "./../repository/Products.repository.js";
import CustomersRepository from "./../repository/Customers.repository.js";
import { getHtmlEmailNotification } from "./../nodemailer/html/utilsHtml.js";
import {
  formatProduct,
  getTotalOrder,
  formatWhatsappNumber,
  __dirname,
  getDiagnosis,
  getNroComproString,
} from "../utils.js";
import { nanoid } from "nanoid";
import { buildOrderPDF } from "../pdfKit/pdfKit.js";
import StatisticsTechnicalDto from "../dao/DTOs/StatisticsTechnical.dto.js";
import { sendOrder } from "../whatsapp/sendWhatsapp.js";
import { isValidPhoneNumber } from "../validators/validator.js";
import { sendPdfToSinapsisWeb } from "../ftpService/FtpService.js";
import * as invoicesService from "./invoices.service.js";

const orderManager = new Orders();
const orderRepository = new OrdersRepository(orderManager);
const productManager = new Products();
const productsRepository = new ProductsRepository(productManager);
const customersManager = new Customers();
const customersRepository = new CustomersRepository(customersManager);

export const getOrders = async (from, to) =>
  await orderRepository.getOrders(from, to);

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
  order.invoice = await invoicesService.getServiceWorkInvoice(
    order.codigo,
    order.nrocompro
  );

  return order;
};

export const getStatistics = async (from, to) => {
  const technicals = await orderRepository.getTechnicals(from, to);
  if (technicals.length === 0) return [];
  const statistics = technicals.map(
    (technical) => new StatisticsTechnicalDto(technical.code_technical)
  );

  const data = await orderRepository.getOrdersWithProducts(
    from,
    to,
    "diagnosticado"
  );
  const orders = data.filter((order) => order.estado === 23);

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
  let cost = Number(order.costo) > 1 ? Number(order.costo) : 1;

  const result = await orderRepository.take(
    order.nrocompro,
    code_technical,
    cost
  );
  if (!result) return false;

  const customer = await customersRepository.getByCode(order.codigo);
  if (customer[0].mail && process.env.NODE_ENV === "production") {
    await sendMail(
      customer[0].mail,
      "Sinapsis - ORDEN REPARACION",
      "Notificacion Servicio Tecnico",
      getHtmlEmailNotification(
        `La misma fue tomada por un técnico. Cuando este finalizada, recibiras una notificación.`,
        order.nrocompro
      )
    );
  }

  return result;
};

export const updateDiagnosis = async ({ nrocompro, diagnosis, user }) =>
  await orderRepository.updateDiagnosis({ nrocompro, diagnosis, user });

export const close = async (
  nrocompro,
  diagnostico,
  costo,
  code_technical,
  diag,
  notification
) => {
  diag = getDiagnosis(diag);
  if (!diag) return;

  const result = await orderRepository.close(
    nrocompro,
    diagnostico,
    costo,
    code_technical,
    diag
  );
  const orderUpdate = await getOrder(nrocompro);

  if (notification) {
    const customer = await customersRepository.getByCode(orderUpdate.codigo);
    if (!customer[0].mail) return result;

    const info = await sendMail(
      customer[0].mail,
      "Sinapsis - ORDEN REPARACION",
      "Notificacion Servicio Tecnico",
      getHtmlEmailNotification(
        `La misma se encuentra finalizada y lista para retirar.`,
        nrocompro
      )
    );
    result.email = info;
  }
  return result;
};

export const free = async (nrocompro) => await orderRepository.free(nrocompro);

export const out = async (order, notification, user) => {
  if (order.products.length > 0) {
    const saleNote = await orderRepository.getSaleNoteNumber(order.nrocompro);
    for (const product of order.products) {
      await productsRepository.removeReservation(product.codigo);
      await orderRepository.removeSaleNoteReservation(saleNote, product);
    }
  }
  const result = await orderRepository.out({
    user: user.code_technical,
    nrocompro: order.nrocompro,
  });

  if (notification) {
    const customer = await customersRepository.getByCode(order.codigo);
    if (customer[0].mail) {
      const info = await sendMail(
        customer[0].mail,
        "Sinapsis - ORDEN REPARACION",
        "Notificacion Servicio Tecnico",
        getHtmlEmailNotification(
          `La misma fue retirada hoy.
          <br />
          Gracias por confiar en nosotros.`,
          order.nrocompro
        ),
        null,
        user.email
      );
    }
  }
  return result;
};

export const handleProductsInOrder = async (order, user) => {
  for (const p of order.products) {
    if (!p.serie) p.serie = nanoid();
  }
  const oldOrder = await getOrder(order.nrocompro);

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
  let saleNote = "";
  saleNote = await orderRepository.getSaleNoteNumber(oldOrder.nrocompro);
  if (!saleNote) {
    await orderRepository.createSaleNote({ order: oldOrder });
    saleNote = await orderRepository.getSaleNoteNumber(oldOrder.nrocompro);
    if (!saleNote) return;
  }
  if (addedProducts.length > 0) {
    const lastItem = await orderRepository.getLastItem(saleNote);
    let itemNumber = lastItem + 1;
    for (const product of addedProducts) {
      await orderRepository.createSaleNoteReservation(
        saleNote,
        oldOrder,
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
      await orderRepository.removeSaleNoteReservation(saleNote, product);

      await productsRepository.removeReservation(product.codigo);
      await productsRepository.removeProductFromOrder(order, product);
    }
  }

  const resultPdf = await buildOrderPDF(order, user);
  const fileName = resultPdf.fileName;

  return { result: resultPdf, fileName };
};

export const updateCustomer = async (nrocompro, customer) => {
  await orderRepository.updateCustomer(nrocompro, customer);
  await orderRepository.updateCustomerInProducts(nrocompro, customer);
  return true;
};

export const create = async ({ order, user }) => {
  await orderRepository.create(order);

  const lastNrocompro = await orderRepository.getLastNumberTable(
    process.env.ORDER_POSITION,
    "OR"
  );
  const lastOrder = await getOrder(getNroComproString(lastNrocompro));

  return await buildOrderPDF(lastOrder, user, true);
};

export const updateOrder = async ({ newOrder, order }) => {
  const orderUpdated = { ...order, ...newOrder };
  return await orderRepository.updateOrder({
    nrocompro: order.nrocompro,
    order: orderUpdated,
  });
};

export const createPdf = async ({ order, user, customer = false }) =>
  await buildOrderPDF(order, user, customer);

export const sendCustomerPdf = async ({ order, user }) => {
  const responseCustomer = await customersRepository.getByCode(order.codigo);
  const customer = responseCustomer[0];

  if (!customer.telefono || !isValidPhoneNumber(customer.telefono)) {
    return null;
  }
  const recipient = formatWhatsappNumber(customer.telefono);

  const nrocompro = order.nrocompro;
  const pathPdf = `${__dirname}/public/pdfHistory/customers/${nrocompro}.pdf`;

  const responseWeb = await fetch(
    `https://sinapsis.com.ar/resources/serviceworks/${nrocompro}.pdf`
  );

  if (responseWeb?.status !== 200) {
    await createPdf({ order, user, customer: true });
    const responseFtp = sendPdfToSinapsisWeb({
      path: pathPdf,
      nrocompro,
    });
    if (!responseFtp) return false;
  }

  const response = await sendOrder({ nrocompro, recipient });
  return response.status;
};
