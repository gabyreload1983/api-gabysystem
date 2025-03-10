import moment from "moment";
import Customers from "../dao/sqlManager/Customers.js";
import CustomersRepository from "../repository/Customers.repository.js";

const customerManager = new Customers();
const customersRepository = new CustomersRepository(customerManager);

export const getByCode = async (codigo) => {
  const customer = await customersRepository.getByCode(codigo);
  if (!customer || customer?.length === 0) return;

  return customer[0];
};

export const getCustomersByName = async (name) =>
  await customersRepository.getByName(name);

export const getCustomers = async (description, phone, email) => {
  if (description)
    return await customersRepository.getCustomersBy("nombre", description);
  if (phone) return await customersRepository.getCustomersBy("telefono", phone);
  if (email) return await customersRepository.getCustomersBy("mail", email);

  return await customersRepository.getCustomers();
};

export const getSubscribers = async () =>
  await customersRepository.getSubscribers();

export const addSubscriber = async (code) =>
  await customersRepository.addSubscriber(code);

export const removeSubscription = async (code) =>
  await customersRepository.removeSubscription(code);

export const getSummaries = async (balanceFilter = 1000) => {
  const customers = await customersRepository.getCustomers();
  const salesConditions = await customersRepository.getSalesConditions();

  for (const customer of customers) {
    const vouchers = await customersRepository.getCustomersVouchers(
      customer.codigo
    );
    customer.balance = 0;
    customer.lastPay = "";

    const index = salesConditions.findIndex((condition) => {
      return condition.code === Number(customer.condicion);
    });
    if (index !== -1) {
      customer.condicion = salesConditions[index].description;
    }

    for (const voucher of vouchers) {
      if (
        voucher.contado !== "S" &&
        (voucher.tipo === "FV" ||
          voucher.tipo === "RP" ||
          voucher.tipo === "ND")
      )
        customer.balance += Number(voucher.importe);

      if (voucher.tipo === "RE" || voucher.tipo === "NC")
        customer.balance -= Number(voucher.importe);

      if (voucher.tipo === "RE" && !customer.lastPay)
        customer.lastPay = voucher.fecha;
      if (
        voucher.tipo === "RE" &&
        customer.lastPay &&
        moment(voucher.fecha).isAfter(customer.lastPay)
      )
        customer.lastPay = voucher.fecha;
    }
  }
  return customers
    .filter((customer) => customer.balance > balanceFilter)
    .sort((a, b) => b.balance - a.balance);
};
