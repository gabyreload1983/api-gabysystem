import logger from "../../logger/logger.js";
import { connectionUrbano } from "../dbMySqlConfig.js";

export default class Customers {
  constructor() {
    logger.info("Working Customers with DB in MySQL");
  }

  #getFromUrbano = (querySelect) => {
    return new Promise((resolve, reject) => {
      connectionUrbano.query(querySelect, (error, result) => {
        if (error) {
          reject(new error(error.message));
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

  getByName = async (description) =>
    await this.#getFromUrbano(
      `SELECT * FROM clientes WHERE nombre LIKE '%${description}%'`
    );
}
