import logger from "../../logger/logger.js";
import { sendQueryUrbano } from "./sqlUtils.js";

export default class Products {
  constructor() {
    logger.info("Working Products with DB in MySQL");
  }

  getByCode = async (code, stock) =>
    await sendQueryUrbano(
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
    await sendQueryUrbano(`
    SELECT *
    FROM artstk01 s
    INNER JOIN articulo a 
    ON s.codigo = a.codigo
    WHERE a.codbarra = ${ean} ${stock && "AND (s.stockd01 - s.reserd01) > 0"}`);

  getByDescription = async (description, stock) =>
    await sendQueryUrbano(`
    SELECT *
    FROM artstk01 s
    INNER JOIN articulo a 
    ON s.codigo = a.codigo
      WHERE a.descrip LIKE '%${description}%' ${
      stock && "AND (s.stockd01 - s.reserd01) > 0"
    } ORDER BY a.descrip`);

  getDollarValue = async () => {
    const dollar = await sendQueryUrbano(
      `SELECT * FROM cotiza  WHERE codigo =  'BD'`
    );
    return Number(dollar[0].valorlibre);
  };
}
