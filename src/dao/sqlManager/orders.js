import { connectionUrbano } from "../dbMySqlConfig.js";

export default class Orders {
  constructor() {
    console.log("Working Orders with DB in MySQL");
  }

  getFromUrbano = (querySelect) => {
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

  getInProcess = async () =>
    await this.getFromUrbano(
      `SELECT * FROM trabajos WHERE estado = 22 ORDER BY tecnico`
    );

  getPendings = async (sector) =>
    await this.getFromUrbano(
      `SELECT * FROM trabajos 
      WHERE  codiart = ".${sector}" AND estado = 21 AND codigo != "ANULADO"
      ORDER BY prioridad DESC`
    );

  getInProgressByTechnical = async (code_technical) =>
    await this.getFromUrbano(
      `SELECT * FROM trabajos 
      WHERE tecnico="${code_technical}" AND estado = 22 AND codigo != "ANULADO"
      ORDER BY prioridad DESC`
    );

  getById = async (nrocompro) =>
    await this.getFromUrbano(
      `SELECT * FROM trabajos WHERE nrocompro = '${nrocompro}'`
    );
}
