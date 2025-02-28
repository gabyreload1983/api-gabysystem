import Replacements from "../dao/mongoManagers/Replacements.js";
import ReplacementsRepository from "../repository/Replacements.repository.js";

const replacementsManager = new Replacements();
const replacementsRepository = new ReplacementsRepository(replacementsManager);

export const getReplacementById = async (id) =>
  await replacementsRepository.getReplacementById(id);

export const getReplacementByOrderNumber = async (orderNumber) =>
  await replacementsRepository.getReplacementByOrderNumber(orderNumber);

export const getReplacements = async (archived) =>
  await replacementsRepository.getReplacements(archived);

export const create = async (replacement) =>
  await replacementsRepository.create(replacement);

export const update = async (id, replacement) =>
  await replacementsRepository.update(id, replacement);

export const remove = async (id) => await replacementsRepository.remove(id);
