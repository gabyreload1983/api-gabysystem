import { CONSTANTS } from "../../config/constants/constansts.js";
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

  getOverdueInvoices = async (from, to) =>
    await sendQueryUrbano(
      `
    SELECT 
    *, 
    cl.provincia AS state,
    cl.nombre AS name,
    ct.numero AS invoiceNumber,
    cl.codigo AS customerCode,
    cl.condicion AS customerCondition,
    cl.mail AS customerEmail,
    cl.telefono AS customerPhone
    FROM clientes cl
    INNER JOIN  ctacli ct
    ON cl.codigo = ct.codigo
    INNER JOIN ccrenglo cc
    ON ct.nrocompro = cc.nrocompro
    INNER JOIN condvtas cv
    ON cl.condicion = cv.numero
    WHERE ct.fecha > ? AND  ct.fecha < ? 
    AND ct.importe = ct.saldo
    AND ct.tipo = 'FV'
    `,
      [from, to]
    );

  getServiceWorkInvoice = async (codigo, serviceworkNro) =>
    await sendQueryUrbano(
      `SELECT nrocompro, saldo FROM ctacli 
        WHERE codigo = ? AND vienede = ?`,
      [codigo, serviceworkNro]
    );

  getCustomerInvoicesPending = async (id, from, to) =>
    await sendQueryUrbano(
      `SELECT * FROM ctacli WHERE codigo = ? AND tipo = 'FV' AND saldo = importe AND fecha > ? AND fecha < ?`,
      [id, from, to]
    );
}
