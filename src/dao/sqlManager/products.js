import { connectionUrbano } from "../dbMySqlConfig.js";

export default class Products {
  constructor() {
    console.log("Working Products with DB in MySQL");
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

  getProduct = async (codigo) =>
    await this.#getFromUrbano(
      `SELECT * FROM articulo WHERE codigo = '${codigo}'`
    );

  getDollarValue = async () => {
    const dollar = await this.#getFromUrbano(
      `SELECT * FROM cotiza  WHERE codigo =  'BD'`
    );
    return Number(dollar[0].valorlibre);
  };
}
