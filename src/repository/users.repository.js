import UsersDto from "../dao/DTOs/users.dto.js";

export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers = async () => await this.dao.getUsers();

  getUserByCode = async (code_technical) =>
    await this.dao.getByCodeTechnical(code_technical.toUpperCase());

  getByEmail = async (email) => await this.dao.getByEmail(email);

  createUser = async (user) => await this.dao.create(user);

  login = async (user) => new UsersDto(user);

  update = async (uid, user) => await this.dao.update(uid, user);
}
