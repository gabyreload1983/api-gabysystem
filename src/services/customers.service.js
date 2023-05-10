import Customers from "../dao/sqlManager/customers.js";

const customerManager = new Customers();

export const getByCode = async (codigo) =>
  await customerManager.getByCode(codigo);

export const getCustomersByName = async (name) =>
  await customerManager.getByName(name);
