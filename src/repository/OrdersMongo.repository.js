import OrdersDto from "../dao/DTOs/Orders.dto.js";
import OrdersUpdateDto from "../dao/DTOs/OrdersUpdate.dto.js";

export default class OrdersMongoRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getOrder = async (oid) => await this.dao.getOrder(oid);

  getOrders = async () => await this.dao.getOrders();

  getByNrocompro = async (nrocompro) =>
    await this.dao.getByNrocompro(nrocompro);

  getBySaleNoteNumber = async (saleNoteNumber) =>
    await this.dao.getBySaleNoteNumber(saleNoteNumber);

  create = async (order, saleNote, saleNotePosition, saleNoteNumber) =>
    await this.dao.create(
      new OrdersDto(order, saleNote, saleNotePosition, saleNoteNumber)
    );

  update = async (oid, order) =>
    await this.dao.update(oid, new OrdersUpdateDto(order));

  delete = async (oid) => await this.dao.delete(oid);
}
