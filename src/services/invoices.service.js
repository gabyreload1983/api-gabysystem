import moment from "moment";
import Invoices from "../dao/sqlManager/Invoices.js";
import InvoicesRepository from "../repository/Invoices.repository.js";
import { formatInvoices } from "../utils.js";

const invoicesService = new Invoices();
const invoiceRepository = new InvoicesRepository(invoicesService);

export const getInvoicesCommission = async (from, to) =>
  await invoiceRepository.getInvoicesCommission(from, to);

export const getInvoicesPending = async (from, to) => {
  const data = await invoiceRepository.getInvoicesPending(from, to);
  return formatInvoices(data);
};

export const getServiceWorkInvoice = async (codigo, serviceworkNro) => {
  const response = await invoiceRepository.getServiceWorkInvoice(
    codigo,
    serviceworkNro
  );
  if (response?.length === 1) {
    const invoice = {
      nrocompro: response[0].nrocompro,
      balance: response[0].saldo,
    };
    return invoice;
  }
  return false;
};

export const getInvoiceSubscribers = async (from) => {
  const to = moment(from).add(10, "days").format("YYYY-MM-DD");

  const data = await invoiceRepository.getInvoiceSubscribers(from, to);
  return formatInvoices(data);
};
