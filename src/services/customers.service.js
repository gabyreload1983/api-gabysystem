import moment from "moment";
import Customers from "../dao/sqlManager/Customers.js";
import CustomersRepository from "../repository/Customers.repository.js";
import Invoices from "../dao/sqlManager/Invoices.js";
import InvoicesRepository from "../repository/Invoices.repository.js";
import { CONSTANTS } from "../config/constants/constansts.js";
import { getSaleConditionDescription } from "../utils.js";

const customerManager = new Customers();
const customersRepository = new CustomersRepository(customerManager);
const invoicesManager = new Invoices();
const invoicesRepository = new InvoicesRepository(invoicesManager);

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
  const allCustomers = await customersRepository.getCustomers();
  const customersNotIncluided = [".CF"];
  const customers = allCustomers.filter(
    (customer) => !customersNotIncluided.includes(customer.codigo)
  );

  for (const customer of customers) {
    const vouchers = await customersRepository.getCustomersVouchers(
      customer.codigo
    );
    customer.balance = 0;
    customer.lastPay = "";

    customer.saleCondition = getSaleConditionDescription(customer.condicion);

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
export const getSummariesCurrentAccount30Days = async () => {
  const customers = await customersRepository.getCustomersByCondition(
    CONSTANTS.CURRENT_ACCOUNT_30_DAYS
  );

  const oneYearAgo = moment().subtract(1, "year").format("YYYY-MM-DD");
  const thirtyDaysAgo = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD 23:59:59");

  const filterCustomers = [];

  for (const customer of customers) {
    const invoices = await invoicesRepository.getCustomerInvoicesPending(
      customer.codigo,
      oneYearAgo,
      thirtyDaysAgo
    );

    if (invoices.length) {
      customer.balance = invoices.reduce(
        (acc, val) => acc + Number(val.saldo),
        0
      );
      customer.saleCondition = getSaleConditionDescription(customer.condicion);
      filterCustomers.push(customer);
    }
  }

  return filterCustomers;
};
