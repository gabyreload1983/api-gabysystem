import CommissionsBalance from "../dao/mongoManagers/CommissionsBalance.js";
import CommissionsBalanceCreateDto from "../dao/DTOs/commissionsBalance/CommissionsBalanceCreate.dto.js";

const commissionsBalance = new CommissionsBalance();

export const getAll = async (from, to) => {
  if (from && to) return await commissionsBalance.getAllFromTo(from, to);

  return await commissionsBalance.getAll();
};

export const create = async (sale) => {
  const porcentage = 0.4;
  if (sale.deliveryCost === 0) {
    sale.rent = sale.profit * porcentage;
  } else {
    sale.rent = sale.profit * porcentage - sale.deliveryCost / 2;
  }
  const exists = await commissionsBalance.findByInvoiceId(sale.invoiceId);
  if (exists) return false;
  return await commissionsBalance.create(new CommissionsBalanceCreateDto(sale));
};

export const findById = async (_id) =>
  await commissionsBalance.findById({ _id });

export const findByInvoiceId = async (numberId) =>
  await commissionsBalance.findByInvoiceId({ numberId });

export const update = async (_id, item) =>
  await commissionsBalance.update({ _id }, item);
