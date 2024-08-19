import { sendQueryUrbano } from "./sqlUtils.js";

export default class Customers {
  constructor() {}

  getByCode = async (codigo) =>
    await sendQueryUrbano(`SELECT * FROM clientes WHERE codigo = ?`, [codigo]);

  getByName = async (description) =>
    await sendQueryUrbano(`SELECT * FROM clientes WHERE nombre LIKE ?`, [
      `%${description}%`,
    ]);

  getCustomers = async () => await sendQueryUrbano(`SELECT * FROM clientes`);

  getSubscribers = async () =>
    await sendQueryUrbano(
      `SELECT * FROM clientes WHERE condicion = 30 ORDER BY nombre`
    );

  getCustomersVouchers = async (id) =>
    await sendQueryUrbano(`SELECT * FROM ctacli WHERE codigo = ?`, [id]);

  getSalesConditions = async () =>
    await sendQueryUrbano(
      `SELECT numero AS code, textofac AS description FROM condvtas`
    );
}
