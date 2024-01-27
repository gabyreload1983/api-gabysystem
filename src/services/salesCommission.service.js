import SalesCommissionCreateDto from "../dao/DTOs/SalesCommissionCreate.dto.js";
import SalesCommissionUpdateDto from "../dao/DTOs/SalesCommissionUpdate.dto.js";
import SalesCommission from "../dao/mongoManagers/SalesCommission.js";
import * as invoicesService from "../services/invoices.service.js";
import * as alexisAccountService from "../services/alexisAccount.service.js";

const salesCommission = new SalesCommission();

export const create = async (invoice) => {
  const exists = await salesCommission.findByInvoiceId(invoice.invoiceId);
  if (exists) return;
  const response = await salesCommission.create(invoice);
  return response;
};

export const getAll = async () => await salesCommission.getAll();

export const getFilter = async (filter) =>
  await salesCommission.getFilter(filter);

export const getByInvoice = async (id) =>
  await salesCommission.findByInvoiceId(id);

export const refresh = async (from, to) => {
  const response = await invoicesService.getInvoicesCommission(from, to);

  if (!response || !response.length) return false;

  const invoices = response.map(
    (invoice) => new SalesCommissionCreateDto(invoice)
  );
  for (let invoice of invoices) await create(invoice);

  return true;
};

export const updateSale = async (sale) => {
  if (sale.invoiceState === "pay" && sale.deliveryState) {
    const response = await alexisAccountService.create(sale);
    if (response) {
      sale.isProfitApply = true;
    }
  }
  return await salesCommission.update(
    sale._id,
    new SalesCommissionUpdateDto(sale)
  );
};
