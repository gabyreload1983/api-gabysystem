import Invoices from "../dao/sqlManager/Invoices.js";

const invoicesService = new Invoices();

export const getInvoicesCommission = async (date) =>
  await invoicesService.getInvoicesCommission(date);
