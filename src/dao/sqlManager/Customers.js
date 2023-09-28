import logger from "../../logger/logger.js";
import { sendQueryUrbano } from "./sqlUtils.js";

export default class Customers {
  constructor() {
    logger.info("Working Customers with DB in MySQL");
  }

  getByCode = async (codigo) =>
    await sendQueryUrbano(`SELECT * FROM clientes WHERE codigo = '${codigo}'`);

  getByName = async (description) =>
    await sendQueryUrbano(
      `SELECT * FROM clientes WHERE nombre LIKE '%${description}%'`
    );

  getCustomers = async () => await sendQueryUrbano(`SELECT * FROM clientes`);

  getCustomersVouchers = async (id) =>
    await sendQueryUrbano(`SELECT * FROM ctacli WHERE codigo = '${id}'`);
}
