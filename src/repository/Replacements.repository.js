import ReplacementCreateDto from "../dao/DTOs/ReplacementCreate.dto.js";
import ReplacementUpdateDto from "../dao/DTOs/ReplacementUpdate.dto.js";

export default class ReplacementsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getReplacementById = async (id) => await this.dao.getReplacementById(id);

  getReplacementByOrderNumber = async (orderNumber) =>
    await this.dao.getReplacementByOrderNumber(orderNumber);

  getReplacements = async (archived) =>
    await this.dao.getReplacements(archived);

  create = async (replacement) =>
    await this.dao.create(new ReplacementCreateDto(replacement));

  update = async (id, replacement) =>
    await this.dao.update(id, new ReplacementUpdateDto(replacement));

  remove = async (id) => await this.dao.remove(id);
}
