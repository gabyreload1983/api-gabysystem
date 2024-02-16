import { sendQueryUrbano } from "./sqlUtils.js";

export default class Invoices {
  constructor() {}

  getInvoicesCommission = async (from, to) =>
    await sendQueryUrbano(`
    SELECT 
    cc.fecha,
    cl.codigo,
    cl.razon,
    cc.nrocompro,
    SUM(cc.precio * cc.cantidad)  AS _subtotal,
    SUM(cc.ivai * cc.cantidad)  AS _iva,
    SUM(cc.costo * cc.cantidad)  AS _costo,
    SUM(cc.precio * cc.cantidad - cc.costo * cc.cantidad)  AS _renta,
    cc.operador,
    cc.vienede,
    cc.tipo
    FROM ccrenglo cc
    INNER JOIN clientes cl
    ON cc.codigo = cl.codigo
    WHERE 
    cl.condicion = 20 AND  fecha > '${from}' AND  fecha < '${to}' AND (cc.letra = 'A' OR cc.letra = 'B')
    GROUP BY cc.nrocompro`);

  getInvoicesPending = async (from, to) =>
    await sendQueryUrbano(`
    SELECT 
    *, 
    cl.provincia AS state,
    cl.nombre AS name,
    ct.numero AS invoiceNumber
    FROM clientes cl
    INNER JOIN  ctacli ct
    ON cl.codigo = ct.codigo
    INNER JOIN ccrenglo cc
    ON ct.nrocompro = cc.nrocompro
    INNER JOIN condvtas cv
    ON cl.condicion = cv.numero
    WHERE ct.fecha > '${from}' AND  ct.fecha < '${to}' AND ct.saldo != 0 AND ct.tipo = 'FV' AND (ct.letra = 'A' OR ct.letra = 'B')
    `);
}
