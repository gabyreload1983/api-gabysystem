export default class CustomersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getByCode = async (codigo) => this.dao.getByCode(codigo);

  getByName = async (description) => this.dao.getByName(description);
}
