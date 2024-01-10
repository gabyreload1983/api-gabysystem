import SalesCommission from "../dao/mongoManagers/SalesCommission.js";

const salesCommission = new SalesCommission();

export const create = async (invoice) => {
  const response = await salesCommission.create(invoice);
  return response;
};

export const getAll = async () => await salesCommission.getAll();

export const getByInvoice = async (id) =>
  await salesCommission.findByInvoiceId(id);
