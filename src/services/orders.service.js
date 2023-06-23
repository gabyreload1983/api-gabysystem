import Customers from "../dao/sqlManager/Customers.js";
import Products from "../dao/sqlManager/Products.js";
import OrdersRepository from "../repository/Orders.repository.js";
import Orders from "../dao/sqlManager/Orders.js";
import sendMail from "./../nodemailer/config.js";
import ProductsRepository from "./../repository/Products.repository.js";
import CustomersRepository from "./../repository/Customers.repository.js";
import { getHtmlCloseOrder } from "./../nodemailer/html/utilsHtml.js";
import { formatProduct, getTotalOrder } from "../utils.js";

const orderManager = new Orders();
const orderRepository = new OrdersRepository(orderManager);
const productManager = new Products();
const productsRepository = new ProductsRepository(productManager);
const customersManager = new Customers();
const customersRepository = new CustomersRepository(customersManager);

export const getInProcess = async () => orderRepository.getInProcess();

export const getToDeliver = async () => orderRepository.getToDeliver();

export const getFinalDisposition = async () =>
  orderRepository.getFinalDisposition();

export const getPendings = async (sector) =>
  orderRepository.getPendings(sector);

export const getInProgressByTechnical = async (code_technical) =>
  orderRepository.getInProgressByTechnical(code_technical);

export const getOrder = async (nrocompro) => {
  let order = await orderRepository.getOrder(nrocompro);
  if (order.length === 0) return null;
  order = order[0];
  const dollar = await productsRepository.getDollarValue();

  order.products = order.products.map((product) =>
    formatProduct(product, dollar)
  );
  order.total = getTotalOrder(order);

  return order;
};

export const take = async (nrocompro, code_technical) =>
  await orderRepository.take(nrocompro, code_technical);

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
  if (notification) {
    const order = await orderRepository.getOrder(nrocompro);
    const customer = await customersRepository.getByCode(order[0].codigo);
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
