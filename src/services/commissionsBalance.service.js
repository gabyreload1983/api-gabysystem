import CommissionsBalance from "../dao/mongoManagers/CommissionsBalance.js";
import CommissionsBalanceCreateDto from "../dao/DTOs/commissionsBalance/CommissionsBalanceCreate.dto.js";

const commissionsBalance = new CommissionsBalance();

export const getAll = async () => await commissionsBalance.getAll();

export const create = async (item) =>
  await commissionsBalance.create(new CommissionsBalanceCreateDto(item));

export const findById = async (_id) =>
  await commissionsBalance.findById({ _id });

export const findByNumberId = async (numberId) =>
  await commissionsBalance.findByNumberId({ numberId });

export const update = async (_id, item) =>
  await commissionsBalance.update({ _id }, item);
