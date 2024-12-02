import { sendQueryUrbano } from "./sqlUtils.js";

export default class Invoices {
  constructor() {}

  getInvoicesCommission = async (from, to) =>
    await sendQueryUrbano(
      `
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
    cl.condicion = 20 AND  fecha > ? AND  fecha < ? AND (cc.letra = 'A' OR cc.letra = 'B')
    GROUP BY cc.nrocompro`,
      [from, to]
    );

  getInvoicesPending = async (from, to) =>
    await sendQueryUrbano(
      `
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
    WHERE ct.fecha > ? AND  ct.fecha < ? AND ct.saldo != 0 AND ct.tipo = 'FV' AND (ct.letra = 'A' OR ct.letra = 'B')
    `,
      [from, to]
    );

  getServiceWorkInvoice = async (codigo, serviceworkNro) =>
    await sendQueryUrbano(
      `SELECT nrocompro, saldo FROM ctacli 
        WHERE codigo = ? AND vienede = ?`,
      [codigo, serviceworkNro]
    );

  getInvoiceSubscribers = async (from, to) =>
    await sendQueryUrbano(
      `SELECT * FROM ctacli ct
        INNER JOIN clientes c
        ON ct.codigo = c.codigo
        INNER JOIN ccrenglo cc
        ON ct.nrocompro = cc.nrocompro
        WHERE c.condicion = 30
        AND cc.codiart = '.a'
        AND ct.fecha BETWEEN ? AND ?`,
      [from, to]
    );
}
