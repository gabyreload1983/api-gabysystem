import UsersLoginDto from "../dao/DTOs/UsersLogin.dto.js";
import UsersDbDto from "../dao/DTOs/UsersDb.dto.js";

export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUser = async (uid) => {
    const user = await this.dao.getUser(uid);
    return new UsersLoginDto(user);
  };

  getUsers = async () => await this.dao.getUsers();

  getByCode = async (code_technical) => {
    const user = await this.dao.getByCode(code_technical.toUpperCase());
    return new UsersLoginDto(user);
  };

  register = async (user) => await this.dao.register(new UsersDbDto(user));

  getByEmail = async (email) => await this.dao.getByEmail(email);

  login = async (user) => new UsersLoginDto(user);

  update = async (uid, user) =>
    await this.dao.update(uid, new UsersLoginDto(user));

  delete = async (uid) => await this.dao.delete(uid);
}
