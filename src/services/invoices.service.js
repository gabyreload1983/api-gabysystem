import Invoices from "../dao/sqlManager/Invoices.js";
import InvoicesRepository from "../repository/Invoices.repository.js";

const invoicesService = new Invoices();
const invoiceRepository = new InvoicesRepository(invoicesService);

export const getInvoicesCommission = async (from, to) =>
  await invoiceRepository.getInvoicesCommission(from, to);

export const getInvoicesPending = async (from, to) => {
  const invoicesDetail = await invoiceRepository.getInvoicesPending(from, to);
  return formatInvoices(invoicesDetail);
};

export const getOverdueInvoices = async (from, to) => {
  const invoicesDetail = await invoiceRepository.getOverdueInvoices(from, to);
  const invoices = formatInvoices(invoicesDetail);

  return invoices;
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

function formatInvoices(invoicesDetail) {
  const invoices = [];
  for (let item of invoicesDetail) {
    const index = invoices.findIndex(
      (invoice) => invoice.invoiceId === item.nrocompro
    );
    if (index === -1)
      invoices.push({
        invoiceId: item.nrocompro,
        customerCode: item.customerCode,
        customerEmail: item.customerEmail,
        customerPhone: item.customerPhone,
        customerCondition: item.customerCondition,
        items: [item],
      });
    if (index !== -1) invoices[index].items.push(item);
  }
  return invoices;
}
