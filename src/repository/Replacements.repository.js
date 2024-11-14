import ReplacementCreateDto from "../dao/DTOs/ReplacementCreate.dto";
import ReplacementUpdateDto from "../dao/DTOs/ReplacementUpdate.dto";

export default class ReplacementsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getReplacementById = async (id) => await this.dao.getReplacementById(id);

  getReplacementByOrderNumber = async (orderNumber) =>
    await this.dao.getReplacementByOrderNumber(orderNumber);

  getReplacements = async () => await this.dao.getReplacements();

  create = async (replacement) =>
    await this.dao.create(new ReplacementCreateDto(replacement));

  update = async (id, replacement) =>
    await this.dao.update(id, new ReplacementUpdateDto(replacement));

  remove = async (id) => await this.dao.remove(id);
}
