import Customers from "../dao/sqlManager/Customers.js";
import CustomersRepository from "../repository/Customers.repository.js";

const customerManager = new Customers();
const customersRepository = new CustomersRepository(customerManager);

export const getByCode = async (codigo) =>
  await customersRepository.getByCode(codigo);

export const getCustomersByName = async (name) =>
  await customersRepository.getByName(name);

export const getCustomers = async () =>
  await customersRepository.getCustomers();

export const getSummaries = async () => {
  const customers = await customersRepository.getCustomers();
  return true;
  for (const customer of customers) {
    if (customer.codigo === "1120") {
      const vouchers = await customersRepository.getCustomersVouchers(
        customer.codigo
      );
      for (const voucher of vouchers) {
        console.log(voucher.importe);
        customer.balance = 0;
        if (
          voucher.contado !== "S" &&
          (voucher.tipo === "FV" ||
            voucher.tipo === "FB" ||
            voucher.tipo === "RP" ||
            voucher.tipo === "ND")
        )
          customer.balance += Number(voucher.importe);

        if (voucher.tipo === "RE" || voucher.tipo === "NC")
          customer.balance -= Number(voucher.importe);

        console.log(customer);
        return customer;
      }
    }
  }
};
