import OrderMongoDto from "../dao/DTOs/OrderMongo.dto.js";
import OrdersMongoUpdateDto from "../dao/DTOs/OrdersMongoUpdate.dto.js";

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
      new OrderMongoDto(order, saleNote, saleNotePosition, saleNoteNumber)
    );

  update = async (oid, order) =>
    await this.dao.update(oid, new OrdersMongoUpdateDto(order));

  delete = async (oid) => await this.dao.delete(oid);
}
