import AlexisAccount from "../dao/mongoManagers/AlexisAccount.js";
import SalesCommission from "../dao/mongoManagers/SalesCommission.js";
import AlexisAccountCreateDto from "../dao/DTOs/alexis/AlexisAccountCreate.dto.js";
import { nanoid } from "nanoid";
import SalesCommissionUpdateDto from "../dao/DTOs/SalesCommissionUpdate.dto.js";

const alexisAccount = new AlexisAccount();
const salesCommission = new SalesCommission();

export const getAll = async (year) => {
  if (year) return await alexisAccount.getAllFrom(year);

  return await alexisAccount.getAll();
};

export const create = async (item) => {
  if (item.type === "FV") {
    item.internalId = item.invoiceId;
    item.yearApply = item.date.slice(0, 4);
    const exists = await alexisAccount.findByInternalId(item.internalId);
    if (exists || !item.isValid) return false;

    const RENT_PORCENTAGE = 0.4;
    const TOTAL_INVOICE = item.subTotal + item.tax;
    const CHECH_TAX_PORCENTAGE = 1.2 / 100;
    const CHECK_TAX = TOTAL_INVOICE * CHECH_TAX_PORCENTAGE;
    const PROFIT = item.profit - CHECK_TAX;

    if (item.deliveryCost === 0) {
      item.value = PROFIT * RENT_PORCENTAGE;
    } else {
      item.value = PROFIT * RENT_PORCENTAGE - item.deliveryCost / 2;
    }

    return await alexisAccount.create(new AlexisAccountCreateDto(item));
  }
  if (item.type === "PAY") {
    item.internalId = nanoid();
    return await alexisAccount.create(new AlexisAccountCreateDto(item));
  }
};

export const findById = async (_id) => await alexisAccount.findById(_id);

export const findByInternalId = async (internalId) =>
  await alexisAccount.findByInternalId(internalId);

export const update = async (_id, item) =>
  await alexisAccount.update(_id, item);

export const remove = async (id) => {
  const item = await findById(id);

  const response = await alexisAccount.remove(id);

  const invoice = await salesCommission.findByInvoiceId(item.internalId);

  invoice.isProfitApply = false;
  invoice.invoiceState = "pending";
  invoice.paymentDate = null;
  await salesCommission.update(
    invoice._id,
    new SalesCommissionUpdateDto(invoice)
  );

  return response;
};
