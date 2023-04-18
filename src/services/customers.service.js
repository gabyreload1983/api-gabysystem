import Customers from "../dao/sqlManager/customers.js";

const customerManager = new Customers();

const getCustomerByCode = async (codigo) =>
  await customerManager.getByCode(codigo);

export { getCustomerByCode };
