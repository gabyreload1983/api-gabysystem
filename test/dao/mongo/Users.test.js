import mongoose from "mongoose";
import Users from "../../../src/dao/mongoManagers/Users.js";
import * as chai from "chai";

const expect = chai.expect;

const URI = "mongodb://localhost:27017/";

await mongoose.connect(URI);

let usersDao;

describe("Testing users dao", () => {
  before(() => {
    usersDao = new Users();
  });

  afterEach(async () => {
    try {
      await mongoose.connection.collections.users.drop();
    } catch (error) {
      console.log(error);
    }
  });

  it("Get an empty array from users collection", async () => {
    const result = await usersDao.getUsers();

    expect(result).to.be.deep.equal([]);
    expect(Array.isArray(result)).to.be.equal(true);
  });

  it("Insert a new user in the DataBase", async () => {
    const mockUser = {
      email: "test@test.com",
      password: "password",
      code_technical: "code_technical",
      first_name: "first_name",
      last_name: "last_name",
      role: "role",
    };
    const result = await usersDao.register(mockUser);

    expect(result._id).to.be.ok;
    expect(result.email).to.be.deep.equal(mockUser.email);
  });

  it("Get a user by id", async () => {
    const mockUser = {
      email: "test@test.com",
      password: "password",
      code_technical: "code_technical",
      first_name: "first_name",
      last_name: "last_name",
      role: "role",
    };
    const result = await usersDao.register(mockUser);
    const user = await usersDao.getUser(result._id);

    expect(typeof user).to.be.equal("object");
    expect(user.email).to.be.deep.equal(mockUser.email);
  });

  it("Get a user by email", async () => {
    const mockUser = {
      email: "test@test.com",
      password: "password",
      code_technical: "code_technical",
      first_name: "first_name",
      last_name: "last_name",
      role: "role",
    };
    const result = await usersDao.register(mockUser);
    const user = await usersDao.getByEmail(result.email);

    expect(typeof user).to.be.equal("object");
    expect(user.email).to.be.deep.equal(mockUser.email);
  });

  it("Get a user by code", async () => {
    const mockUser = {
      email: "test@test.com",
      password: "password",
      code_technical: "code_technical",
      first_name: "first_name",
      last_name: "last_name",
      role: "role",
    };
    const result = await usersDao.register(mockUser);
    const user = await usersDao.getByCode(result.code_technical);

    expect(typeof user).to.be.equal("object");
    expect(user.email).to.be.deep.equal(mockUser.email);
  });

  it("Update user", async () => {
    const mockUser = {
      email: "test@test.com",
      password: "password",
      code_technical: "code_technical",
      first_name: "first_name",
      last_name: "last_name",
      role: "role",
    };

    const mockUserUpdate = {
      email: "update@test.com",
      password: "passwordUpdate",
      code_technical: "code_technical_update",
      first_name: "first_name_update",
      last_name: "last_name_update",
      role: "role_update",
    };

    const mongoResponse = {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1,
    };

    const result = await usersDao.register(mockUser);
    const response = await usersDao.update(result._id, mockUserUpdate);

    expect(response).to.be.deep.equal(mongoResponse);

    const user = await usersDao.getByEmail(mockUserUpdate.email);

    expect(user.email).to.be.equal(mockUserUpdate.email);
    expect(user.password).to.be.equal(mockUserUpdate.password);
    expect(user.code_technical).to.be.equal(mockUserUpdate.code_technical);
    expect(user.first_name).to.be.equal(mockUserUpdate.first_name);
    expect(user.last_name).to.be.equal(mockUserUpdate.last_name);
    expect(user.role).to.be.equal(mockUserUpdate.role);
  });

  it("Delete user", async () => {
    const mockUser = {
      email: "test@test.com",
      password: "password",
      code_technical: "code_technical",
      first_name: "first_name",
      last_name: "last_name",
      role: "role",
    };

    const mongoResponse = { acknowledged: true, deletedCount: 1 };

    const result = await usersDao.register(mockUser);
    const response = await usersDao.delete(result._id);

    expect(response).to.be.deep.equal(mongoResponse);

    const users = await usersDao.getUsers();
    expect(users).to.be.deep.equal([]);
  });
});
