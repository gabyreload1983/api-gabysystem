import StockControlCreateDto from "../dao/DTOs/StockControlCreate.dto.js";
import StockControlUpdateDto from "../dao/DTOs/StockControlUpdate.dto.js";

export default class StockControlRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getStockControl = async (id) => await this.dao.getStockControl(id);

  getStockControlByCode = async (code) =>
    await this.dao.getStockControlByCode(code);

  getStockControlsByStatus = async ({ status }) =>
    await this.dao.getStockControlsByStatus({ status });

  getStockControls = async () => await this.dao.getStockControls();

  create = async (stockControl) =>
    await this.dao.create(new StockControlCreateDto(stockControl));

  update = async (id, stockControlUpdate) =>
    await this.dao.update(id, new StockControlUpdateDto(stockControlUpdate));

  remove = async (id) => await this.dao.remove(id);
}
