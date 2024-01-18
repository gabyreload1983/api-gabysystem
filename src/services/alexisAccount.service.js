import AlexisAccount from "../dao/mongoManagers/AlexisAccount.js";
import AlexisAccountCreateDto from "../dao/DTOs/alexis/AlexisAccountCreate.dto.js";
import { nanoid } from "nanoid";

const alexisAccount = new AlexisAccount();

export const getAll = async (from, to) => {
  if (from && to) return await alexisAccount.getAllFromTo(from, to);

  return await alexisAccount.getAll();
};

export const create = async (item) => {
  if (item.type === "FV") {
    item.internalId = item.invoiceId;
    const exists = await alexisAccount.findByInternalId(item.internalId);
    if (exists) return false;

    const PORCENTAGE = 0.4;
    if (item.deliveryCost === 0) {
      item.value = item.profit * PORCENTAGE;
    } else {
      item.value = item.profit * PORCENTAGE - item.deliveryCost / 2;
    }

    return await alexisAccount.create(new AlexisAccountCreateDto(item));
  }
  if (item.type === "PAY") {
    item.internalId = nanoid();
    return await alexisAccount.create(new AlexisAccountCreateDto(item));
  }
};

export const findById = async (_id) => await alexisAccount.findById({ _id });

export const findByInvoiceId = async (numberId) =>
  await alexisAccount.findByInternalId({ numberId });

export const update = async (_id, item) =>
  await alexisAccount.update({ _id }, item);
