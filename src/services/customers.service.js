import Customers from "../dao/sqlManager/Customers.js";
import CustomersRepository from "../repository/Customers.repository.js";

const customerManager = new Customers();
const customersRepository = new CustomersRepository(customerManager);

export const getByCode = async (codigo) =>
  await customersRepository.getByCode(codigo);

export const getCustomersByName = async (name) =>
  await customersRepository.getByName(name);
