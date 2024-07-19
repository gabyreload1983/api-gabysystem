import { sendQueryUrbano } from "./sqlUtils.js";

export default class Orders {
  constructor() {}

  getInProcess = async () =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE estado = 22 ORDER BY tecnico`
    );

  getToDeliver = async (limit = 100) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE 
      ingresado BETWEEN DATE_ADD(NOW(), INTERVAL - 1 YEAR) AND NOW() AND
      codigo != 'ANULADO' AND estado = 23  AND diag = 22 AND ubicacion = 21
      ORDER BY ingresado DESC LIMIT ?`,
      [limit]
    );

  getFinalDisposition = async () =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE 
    ingresado < DATE_ADD(NOW(),INTERVAL - 1 YEAR) AND codigo != 'ANULADO' AND 
    estado = 23  AND diag = 23 AND ubicacion = 21 
    ORDER BY ingresado DESC LIMIT 100`
    );

  getProcessSector = async (sector) => {
    sector = `.${sector}`;
    return await sendQueryUrbano(
      `SELECT * FROM trabajos 
      WHERE  codiart = ? AND estado = 22 AND codigo != "ANULADO"
      ORDER BY prioridad DESC`,
      [sector]
    );
  };

  getPendings = async (sector) => {
    sector = `.${sector}`;
    return await sendQueryUrbano(
      `SELECT * FROM trabajos 
      WHERE  codiart = ? AND estado = 21 AND codigo != 'ANULADO'
      ORDER BY prioridad DESC`,
      [sector]
    );
  };

  getPendingsAll = async () =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos 
      WHERE (estado = 21 OR estado = 22) AND codigo != "ANULADO"
      ORDER BY prioridad DESC`
    );

  getInProgressByTechnical = async (code_technical) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos 
      WHERE tecnico = ? AND estado = 22 AND codigo != "ANULADO"
      ORDER BY prioridad DESC`,
      [code_technical]
    );

  getById = async (nrocompro) =>
    await sendQueryUrbano(`SELECT * FROM trabajos WHERE nrocompro = ?`, [
      nrocompro,
    ]);

  getProductsInOrder = async (nrocompro) =>
    await sendQueryUrbano(
      `SELECT * FROM trrenglo INNER JOIN articulo ON trrenglo.codart = articulo.codigo
     WHERE trrenglo.nrocompro = ?`,
      [nrocompro]
    );

  take = async (nrocompro, code_technical) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET estado = 22, tecnico = ?, costo = 1
    WHERE nrocompro = ?`,
      [code_technical, nrocompro]
    );

  update = async (nrocompro, diagnostico, costo, code_technical) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET diagnostico = ?, costo = ?, pendiente = ?, 
      tecnico = ?, diagnosticado = NOW()
      WHERE nrocompro = ?`,
      [diagnostico, costo, costo, code_technical, nrocompro]
    );

  close = async (nrocompro, diagnostico, costo, code_technical, diag) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET estado = 23, diag = ?, 
      diagnostico = ?, costo = ?, pendiente = ?, 
      diagnosticado = NOW(), tecnico = ?
      WHERE nrocompro = ?`,
      [diag, diagnostico, costo, costo, code_technical, nrocompro]
    );

  free = async (nrocompro) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET estado = 21, diag = 21, tecnico = '', diagnosticado = NOW() 
    WHERE nrocompro = ?`,
      [nrocompro]
    );

  out = async (nrocompro) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET ubicacion = 22 WHERE nrocompro = ?`,
      [nrocompro]
    );

  getOrders = async (from, to, filter = "ingresado") => {
    return await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE ${filter} BETWEEN ? AND ? AND codigo != 'ANULADO'`,
      [`${from} 00:00:00`, `${to} 23:59:59`]
    );
  }; // TODO create 2 new functions: getOrdersIn and getOrdersDiagnosis

  getTechnicals = async (from, to) =>
    await sendQueryUrbano(
      `SELECT DISTINCT tecnico as code_technical FROM trabajos 
      WHERE diagnosticado BETWEEN ? AND ? AND tecnico != ''`,
      [`${from} 00:00:00`, `${to} 23:59:59`]
    );

  getOrdersByCustomer = async (code, limit = 50) =>
    await sendQueryUrbano(
      `SELECT * FROM trabajos WHERE codigo = ? ORDER BY ingresado DESC LIMIT ?`,
      [code, limit]
    );

  updateCustomer = async (nrocompro, customer) =>
    await sendQueryUrbano(
      `UPDATE trabajos SET 
      codigo = ?, 
      nombre = ?, 
      direccion = ?,
      telefono = ? 
      WHERE nrocompro = ?`,
      [
        customer.codigo,
        customer.nombre,
        customer.direccion,
        customer.telefono,
        nrocompro,
      ]
    );

  updateCustomerInProducts = async (nrocompro, customer) =>
    await sendQueryUrbano(
      `
      UPDATE trrenglo SET cliente = ? WHERE nrocompro = ?`,
      [customer.codigo, nrocompro]
    );

  getLastSaleNoteNumber = async (position) =>
    await sendQueryUrbano(
      `SELECT MAX(numero) AS nrocompro FROM nvhead WHERE puesto = ?`,
      [position]
    );

  getLastItem = async (nrocompro) => {
    return await sendQueryUrbano(
      `SELECT MAX(renglon) as lastItem FROM nvrenglo WHERE nrocompro = ?`,
      [nrocompro]
    );
  };

  createSaleNote = async (order, nrocompro, puesto, numero) =>
    await sendQueryUrbano(
      `INSERT INTO nvhead
  (nrocompro, tipo, letra, puesto, numero, fecha, codigo, nombre, tipoiva, cotiza, cuota,
    importe, impocuota, saldo, operador, equipo, contado, tipofactura, marcafiscal)
  VALUES(
    ?, 'NV', 'X', ?, ?, NOW(), ?, ?, 'X', 77, 1,
    7777, 7777, 7777, 'GABYSYSTEM', 'MOSTRADOR', 'N', 'F', 'Q'
  )`,
      [nrocompro, puesto, numero, order.codigo, order.nrocompro]
    );

  createSaleNoteReservation = async (
    orderMongo,
    product,
    itemNumber,
    quantity = 1,
    precio = 777
  ) =>
    await sendQueryUrbano(
      `INSERT INTO nvrenglo 
  (nrocompro, tipo, letra, puesto, numero, codigo, renglon,
    codiart, descart, cantidad, precio, subtotal, operador, equipo, lote, pendiente) 
  VALUES( ?, 'NV', 'X', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'GABYSYSTEM', 'MOSTRADOR', ?, ? )`,
      [
        orderMongo.saleNote,
        orderMongo.saleNotePosition,
        orderMongo.saleNoteNumber,
        orderMongo.nrocompro,
        itemNumber,
        product.codigo,
        orderMongo.nrocompro,
        quantity,
        precio,
        precio,
        product.serie,
        quantity,
      ]
    );

  removeSaleNoteReservation = async (saleNote, product) =>
    await sendQueryUrbano(
      `DELETE FROM nvrenglo WHERE nrocompro = ? AND codiart = ? AND lote = ?`,
      [saleNote, product.codigo, product.serie]
    );

  cancelSaleNoteReservation = async (saleNote) =>
    await sendQueryUrbano(
      `UPDATE nvrenglo SET cantidad = 0, pendiente = 0
       WHERE nrocompro = ?`,
      [saleNote]
    );

  getLastOrderNumber = async (position) =>
    await sendQueryUrbano(
      `SELECT numero FROM pto00${position} WHERE tipo = 'OR'`
    );

  updateLastOrderNumber = async (position, nextNumber) =>
    await sendQueryUrbano(
      `UPDATE pto00${position} SET numero = ? WHERE tipo = 'OR'`,
      [nextNumber]
    );

  create = async (newOrder) =>
    await sendQueryUrbano(
      `INSERT INTO trabajos 
    (nrocompro, codigo, nombre, direccion, telefono, tiposerv, codiart, descart, esquema, garantia, 
      garantiap, serie, operador, equipo, ingresado, falla, accesorios, detalles, estado, 
      seteado, diag, ubicacion, diagnostico,prioridad, tecnico, costo, opcional, pendiente) 
    VALUES 
    (?, ?, ?, '', ?, '2', ?, ?,'N','0',
    '0', ?, ?, 'GABYSYSTEM', NOW(), ?, ?, 'Ingresado desde GABYSYSTEM', 21,
    NOW(), 21, 21, '', ?, '', 1, 'GABYSYSTEM', 1)`,
      [
        newOrder.nrocompro,
        newOrder.codigo,
        newOrder.nombre,
        newOrder.telefono,
        newOrder.codiart,
        newOrder.descart,
        newOrder.serie,
        newOrder.operador,
        newOrder.falla,
        newOrder.accesorios,
        newOrder.prioridad,
      ]
    );

  updateOrder = async (nrocompro, order) =>
    await sendQueryUrbano(
      `
    UPDATE trabajos 
    SET 
    codigo = ?, nombre = ?, telefono = ?, codiart = ?, descart = ?, serie = ?, operador = ?, 
    falla = ?, accesorios = ?, estado = ?, diag = ?, diagnosticado = ?, ubicacion = ?, ubicado = ?, 
    diagnostico = ?, prioridad = ?, tecnico = ?, costo = ?, egresado = ?, pendiente = ?
    WHERE nrocompro = ?`,
      [
        order.codigo,
        order.nombre,
        order.telefono,
        order.codiart,
        order.descart,
        order.serie,
        order.operador,
        order.falla,
        order.accesorios,
        order.estado,
        order.diag,
        order.diagnosticado,
        order.ubicacion,
        order.ubicado,
        order.diagnostico,
        order.prioridad,
        order.tecnico,
        order.costo,
        order.egresado,
        order.pendiente,
        nrocompro,
      ]
    );
}
