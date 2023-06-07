import logger from "../../logger/logger.js";
import { connectionUrbano } from "../dbMySqlConfig.js";

export default class Products {
  constructor() {
    logger.info("Working Products with DB in MySQL");
  }

  #getFromUrbano = (querySelect) => {
    return new Promise((resolve, reject) => {
      logger.debug(querySelect);
      connectionUrbano.query(querySelect, (error, result) => {
        if (error) {
          reject(new Error(error.message));
        } else {
          resolve(result);
        }
      });
    });
  };

  getByCode = async (code, stock) =>
    await this.#getFromUrbano(
      `
      SELECT *
      FROM artstk01 s
      INNER JOIN articulo a 
      ON s.codigo = a.codigo
      WHERE a.codigo = '${code}' ${
        stock && "AND (s.stockd01 - s.reserd01) > 0"
      }`
    );

  getByEan = async (ean, stock) =>
    await this.#getFromUrbano(`
    SELECT *
    FROM artstk01 s
    INNER JOIN articulo a 
    ON s.codigo = a.codigo
    WHERE a.codbarra = ${ean} ${stock && "AND (s.stockd01 - s.reserd01) > 0"}`);

  getByDescription = async (description, stock) =>
    await this.#getFromUrbano(`
    SELECT *
    FROM artstk01 s
    INNER JOIN articulo a 
    ON s.codigo = a.codigo
      WHERE a.descrip LIKE '%${description}%' ${
      stock && "AND (s.stockd01 - s.reserd01) > 0"
    } ORDER BY a.descrip`);

  getDollarValue = async () => {
    const dollar = await this.#getFromUrbano(
      `SELECT * FROM cotiza  WHERE codigo =  'BD'`
    );
    return Number(dollar[0].valorlibre);
  };
}
