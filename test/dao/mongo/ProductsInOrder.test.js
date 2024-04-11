import mongoose from "mongoose";
import ProductsInOrder from "../../../src/dao/mongoManagers/ProductsInOrder.js";
import * as chai from "chai";

const expect = chai.expect;

const URI = "mongodb://localhost:27017/";

await mongoose.connect(URI);

let productsInOrderDao;

const mockProductsInOrder = {
  userEmail: "test@gmail.com",
  technicalEmail: "tecnico@gmail",
  order: "ORX001100016194",
  orderProducts: [],
  addedProducts: [],
  deletedProducts: [],
  pdfName: "ORX001100016194-20230727-145611.pdf",
  date: "2023-07-27T17:56:11.701Z",
};

describe("Testing ProductsInOrder dao", () => {
  before(() => {
    productsInOrderDao = new ProductsInOrder();
  });

  afterEach(async () => {
    try {
      await mongoose.connection.collections.products_in_orders.drop();
    } catch (error) {
      console.log(error);
    }
  });

  it("Create a new productsInOrder document in database", async () => {
    const result = await productsInOrderDao.create(mockProductsInOrder);

    expect(result._id).to.be.ok;
    expect(result.order).to.be.deep.equal(mockProductsInOrder.order);
  });
});
