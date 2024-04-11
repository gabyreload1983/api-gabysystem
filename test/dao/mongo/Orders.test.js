import mongoose from "mongoose";
import Orders from "../../../src/dao/mongoManagers/Orders.js";
import * as chai from "chai";

const expect = chai.expect;

const URI = "mongodb://localhost:27017/";

await mongoose.connect(URI);

let ordersDao;

const mockOrder = {
  nrocompro: "ORX001100012345",
  saleNote: "NVX007700000001",
  saleNotePosition: "77",
  saleNoteNumber: "1",
  state: 22,
  diagnosis: 21,
  ubication: 21,
  dateIn: "2023-11-08T17:38:00.000Z",
  tier: 0,
  description: "CPU COMPLETA",
  accessories: "",
  saler: "TEST",
  technical: "TEST",
  failure: "test",
  diagnosisTechnical: " ",
  price: 1,
  total: 12.543763,
  dateOut: "2024-01-29T18:58:16.000Z",
  orderProducts: [],
};

describe("Testing orders dao", () => {
  before(() => {
    ordersDao = new Orders();
  });

  afterEach(async () => {
    try {
      await mongoose.connection.collections.orders.drop();
    } catch (error) {
      console.log(error);
    }
  });

  it("Get an empty array from orders collection", async () => {
    const result = await ordersDao.getOrders();

    expect(result).to.be.deep.equal([]);
    expect(Array.isArray(result)).to.be.equal(true);
  });

  it("Insert a new order in the DataBase", async () => {
    const result = await ordersDao.create(mockOrder);

    expect(result._id).to.be.ok;
    expect(result.nrocompro).to.be.deep.equal(mockOrder.nrocompro);
  });

  it("Get a order by id", async () => {
    const result = await ordersDao.create(mockOrder);
    const order = await ordersDao.getOrder(result._id);

    expect(typeof order).to.be.equal("object");
    expect(order.nrocompro).to.be.deep.equal(mockOrder.nrocompro);
  });

  it("Get a order by nrocompro", async () => {
    const result = await ordersDao.create(mockOrder);
    const order = await ordersDao.getByNrocompro(result.nrocompro);

    expect(typeof order).to.be.equal("object");
    expect(order.nrocompro).to.be.deep.equal(mockOrder.nrocompro);
  });

  it("Get a order by saleNoteNumber", async () => {
    const result = await ordersDao.create(mockOrder);
    const order = await ordersDao.getBySaleNoteNumber(result.saleNoteNumber);

    expect(typeof order).to.be.equal("object");
    expect(order.nrocompro).to.be.deep.equal(mockOrder.nrocompro);
  });

  it("Update order", async () => {
    const mockOrderUpdate = {
      nrocompro: "ORX001100012346",
      saleNote: "NVX007700000002",
      saleNotePosition: "77",
      saleNoteNumber: "2",
      state: 22,
      diagnosis: 22,
      ubication: 22,
      dateIn: "2023-11-08T17:38:00.000Z",
      tier: 0,
      description: "Impresora",
      accessories: "",
      saler: "TEST_UPATE",
      technical: "TEST_UPDATE",
      failure: "test",
      diagnosisTechnical: " ",
      price: 1,
      total: 12.543763,
      dateOut: "2024-01-29T18:58:16.000Z",
      orderProducts: [],
    };

    const mongoResponse = {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1,
    };

    const result = await ordersDao.create(mockOrder);
    const response = await ordersDao.update(result._id, mockOrderUpdate);

    expect(response).to.be.deep.equal(mongoResponse);

    const order = await ordersDao.getOrder(result._id);

    expect(order.nrocompro).to.be.equal(mockOrderUpdate.nrocompro);
    expect(order.saleNote).to.be.equal(mockOrderUpdate.saleNote);
    expect(order.saleNoteNumber).to.be.equal(mockOrderUpdate.saleNoteNumber);
    expect(order.diagnosis).to.be.equal(mockOrderUpdate.diagnosis);
    expect(order.ubication).to.be.equal(mockOrderUpdate.ubication);
    expect(order.saler).to.be.equal(mockOrderUpdate.saler);
    expect(order.technical).to.be.equal(mockOrderUpdate.technical);
  });

  it("Delete order", async () => {
    const mongoResponse = { acknowledged: true, deletedCount: 1 };

    const result = await ordersDao.create(mockOrder);
    const response = await ordersDao.delete(result._id);

    expect(response).to.be.deep.equal(mongoResponse);

    const orders = await ordersDao.getOrders();
    expect(orders).to.be.deep.equal([]);
  });
});
