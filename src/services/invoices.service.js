import Invoices from "../dao/sqlManager/Invoices.js";

const invoicesService = new Invoices();

export const getInvoicesCommission = async (from, to) =>
  await invoicesService.getInvoicesCommission(from, to);
