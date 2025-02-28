import UsersLoginDto from "../dao/DTOs/UsersLogin.dto.js";
import UsersCreateDto from "../dao/DTOs/UsersCreate.dto.js";
import UserUpdateDto from "../dao/DTOs/UserUpdate.dto.js";
import { CONSTANTS } from "../config/constants/constansts.js";

export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUser = async (uid) => {
    const user = await this.dao.getUser(uid);
    return new UsersLoginDto(user);
  };

  getUsers = async () => {
    const users = await this.dao.getUsers();
    return users
      .map((user) => new UsersLoginDto(user))
      .filter((user) => user.role !== CONSTANTS.ADMIN);
  };

  getByCode = async (code_technical) =>
    await this.dao.getByCode(code_technical.toUpperCase());

  register = async (user) => await this.dao.register(new UsersCreateDto(user));

  getByEmail = async (email) => await this.dao.getByEmail(email);

  login = async (user) => new UsersLoginDto(user);

  update = async (uid, userUpdate) =>
    await this.dao.update(uid, new UserUpdateDto(userUpdate));

  delete = async (uid) => await this.dao.delete(uid);
}
