import Invoices from "../dao/sqlManager/Invoices.js";

const invoicesService = new Invoices();

export const getInvoicesCommission = async (from, to) =>
  await invoicesService.getInvoicesCommission(from, to);

export const getInvoicesPending = async (from, to) => {
  const invoicesDetail = await invoicesService.getInvoicesPending(from, to);
  const invoices = [];
  for (let item of invoicesDetail) {
    const index = invoices.findIndex(
      (invoice) => invoice.invoiceId === item.nrocompro
    );
    if (index === -1)
      invoices.push({ invoiceId: item.nrocompro, items: [item] });
    if (index !== -1) invoices[index].items.push(item);
  }

  return invoices;
};
