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

  take = async (nrocompro, code_technical) =>
    await this
      .getFromUrbano(`UPDATE trabajos SET estado = 22, tecnico = '${code_technical}'
    WHERE nrocompro = '${nrocompro}'`);

  update = async (nrocompro, diagnostico, costo, code_technical) =>
    await this
      .getFromUrbano(`UPDATE trabajos SET diagnostico = '${diagnostico}', costo = ${costo}, pendiente = ${costo}, 
      tecnico = '${code_technical}', diagnosticado = NOW()
      WHERE nrocompro = '${nrocompro}'`);

  close = async (nrocompro, diagnostico, costo, code_technical, diag) =>
    await this.getFromUrbano(
      `UPDATE trabajos SET estado = 23, diag = ${diag}, 
      diagnostico = '${diagnostico}', costo = ${costo}, pendiente = ${costo}, 
      diagnosticado = NOW(), tecnico = '${code_technical}'
      WHERE nrocompro = '${nrocompro}'`
    );

  free = async (nrocompro) =>
    await this
      .getFromUrbano(`UPDATE trabajos SET estado = 21, diag = 21, tecnico = '', diagnosticado = NOW() 
    WHERE nrocompro = '${nrocompro}'`);
}
