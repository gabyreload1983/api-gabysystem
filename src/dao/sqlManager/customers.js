import { connectionUrbano } from "../dbMySqlConfig.js";

export default class Customers {
  constructor() {
    console.log("Working Customers with DB in MySQL");
  }

  #getFromUrbano = (querySelect) => {
    return new Promise((resolve, reject) => {
      connectionUrbano.query(querySelect, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  };

  getByCode = async (codigo) =>
    await this.#getFromUrbano(
      `SELECT * FROM clientes WHERE codigo = '${codigo}'`
    );
}
