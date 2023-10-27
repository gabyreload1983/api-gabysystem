import logger from "../../logger/logger.js";
import { sendQueryUrbano } from "./sqlUtils.js";

export default class Orders {
  constructor() {
    logger.info("Working Orders with DB in MySQL");
  }

  getInProcess = async () =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE estado = 22 ORDER BY tecnico`
    );

  getToDeliver = async (from = "1 YEAR") =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE 
      ingresado BETWEEN DATE_ADD(NOW(),INTERVAL - ${from}) AND NOW() AND
      codigo != 'ANULADO' AND estado = 23  AND diag = 22 AND ubicacion = 21
      ORDER BY ingresado DESC`
    );

  getFinalDisposition = async () =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE 
    ingresado < DATE_ADD(NOW(),INTERVAL - 1 YEAR) AND codigo != 'ANULADO' AND 
    estado = 23  AND diag = 23 AND ubicacion = 21 
    ORDER BY ingresado DESC LIMIT 100`
    );

  getProcessSector = async (sector) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos 
      WHERE  codiart = ".${sector}" AND estado = 22 AND codigo != "ANULADO"
      ORDER BY prioridad DESC`
    );

  getPendings = async (sector) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos 
      WHERE  codiart = ".${sector}" AND estado = 21 AND codigo != "ANULADO"
      ORDER BY prioridad DESC`
    );

  getPendingsAll = async () =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos 
      WHERE (estado = 21 OR estado = 22) AND codigo != "ANULADO"
      ORDER BY prioridad DESC`
    );

  getInProgressByTechnical = async (code_technical) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos 
      WHERE tecnico="${code_technical}" AND estado = 22 AND codigo != "ANULADO"
      ORDER BY prioridad DESC`
    );

  getById = async (nrocompro) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE nrocompro = '${nrocompro}'`
    );

  getProductsInOrder = async (nrocompro) =>
    await sendQueryUrbano(
      `SELECT * FROM trrenglo INNER JOIN articulo ON trrenglo.codart = articulo.codigo
     WHERE trrenglo.nrocompro = '${nrocompro}'`
    );

  take = async (nrocompro, code_technical) =>
    await sendQueryUrbano(`UPDATE trabajos SET estado = 22, tecnico = '${code_technical}', costo = 1
    WHERE nrocompro = '${nrocompro}'`);

  update = async (nrocompro, diagnostico, costo, code_technical) =>
    await sendQueryUrbano(`UPDATE trabajos SET diagnostico = '${diagnostico}', costo = ${costo}, pendiente = ${costo}, 
      tecnico = '${code_technical}', diagnosticado = NOW()
      WHERE nrocompro = '${nrocompro}'`);

  close = async (nrocompro, diagnostico, costo, code_technical, diag) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET estado = 23, diag = ${diag}, 
      diagnostico = '${diagnostico}', costo = ${costo}, pendiente = ${costo}, 
      diagnosticado = NOW(), tecnico = '${code_technical}'
      WHERE nrocompro = '${nrocompro}'`
    );

  free = async (nrocompro) =>
    await sendQueryUrbano(`UPDATE trabajos SET estado = 21, diag = 21, tecnico = '', diagnosticado = NOW() 
    WHERE nrocompro = '${nrocompro}'`);

  out = async (nrocompro) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET ubicacion = 22 WHERE nrocompro = '${nrocompro}'`
    );

  savePdfPath = async (nrocompro, path) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET textorespuesta = '${path}' WHERE nrocompro = '${nrocompro}'`
    );

  getOrders = async (from, to) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE diagnosticado BETWEEN '${from} 00:00:00' AND '${to} 23:59:59' AND estado = 23`
    );

  getTechnicals = async (from, to) =>
    await sendQueryUrbano(
      `SELECT DISTINCT tecnico as code_technical FROM trabajos WHERE diagnosticado BETWEEN '${from} 00:00:00' AND '${to} 23:59:59' AND tecnico != ''`
    );

  getOrdersByCustomer = async (code, limit = 50) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE codigo = '${code}' ORDER BY ingresado DESC LIMIT ${limit}`
    );

  updateCustomer = async (nrocompro, customer) =>
    await sendQueryUrbano(`UPDATE trabajos SET 
      codigo = '${customer.codigo}', 
      nombre = '${customer.nombre}', 
      direccion = '${customer.direccion}',
      telefono = '${customer.telefono}' 
      WHERE nrocompro = '${nrocompro}'`);

  updateCustomerInProducts = async (nrocompro, customer) =>
    await sendQueryUrbano(`UPDATE trrenglo SET 
      cliente = '${customer.codigo}'
      WHERE nrocompro = '${nrocompro}'`);

  getLastSaleNoteNumber = async (position) =>
    await sendQueryUrbano(
      `SELECT MAX(numero) AS nrocompro FROM nvhead WHERE puesto = ${position}`
    );

  createSaleNoteReservation = async (
    saleNote,
    saleNotePosition,
    saleNoteNumber,
    order,
    product,
    quantity = 1
  ) =>
    await sendQueryUrbano(`INSERT INTO nvrenglo 
  (nrocompro, tipo, letra, puesto, numero, codigo, 
    codiart, descart, cantidad, precio, subtotal, operador, equipo, pendiente) 
  VALUES(
    '${saleNote}', 'NV', 'X', ${saleNotePosition}, ${saleNoteNumber}, '${
      order.codigo
    }', '${product.codigo}', 
    '${product.descrip} - ${order.nrocompro}', ${quantity}, ${
      product.priceList1WithouTax
    },
    ${
      product.priceList1WithouTax * quantity
    }, 'GABYSYSTEM', 'MOSTRADOR',  ${quantity}
  )`);

  createSaleNote = async (nrocompro, numero, order, dollar, importe) =>
    await sendQueryUrbano(`INSERT INTO nvhead
  (nrocompro, tipo, letra, puesto, numero, codigo, nombre, tipoiva, cotiza, cuota,
    importe, impocuota, saldo, operador, equipo, contado, tipofactura, marcafiscal)
  VALUES(
    '${nrocompro}', 'NV', 'X', 77, ${numero}, '${order.codigo}', '${order.nombre} - ${order.nrocompro}', 'X', ${dollar}, 1,
    ${importe}, ${importe}, ${importe}, 'GABYSYSTEM', 'MOSTRADOR', 'N', 'F', 'Q'
  )`);
}
