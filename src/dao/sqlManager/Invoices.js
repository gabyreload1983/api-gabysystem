import { sendQueryUrbano } from "./sqlUtils.js";

export default class Invoices {
  constructor() {}

  getInvoicesCommission = async (date) =>
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
    cl.condicion = 20 AND  fecha > '${date}' AND (cc.letra = 'A' OR cc.letra = 'B')
    GROUP BY cc.nrocompro`);
}
