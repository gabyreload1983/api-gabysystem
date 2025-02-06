import { sendQueryUrbano } from "./sqlUtils.js";

export default class Products {
  constructor() {}

  getByCode = async (code) =>
    await sendQueryUrbano(
      `
      SELECT *
      FROM artstk01 s
      INNER JOIN articulo a 
      ON s.codigo = a.codigo
      WHERE a.codigo = ?`,
      [code]
    );

  getByEan = async (ean, stock) =>
    await sendQueryUrbano(
      `
    SELECT *
    FROM artstk01 s
    INNER JOIN articulo a 
    ON s.codigo = a.codigo
    WHERE a.codbarra = ? AND (s.stockd01 - s.reserd01) > 0`,
      [ean]
    );

  getByDescription = async (description) =>
    await sendQueryUrbano(
      `
    SELECT *
    FROM artstk01 s
    INNER JOIN articulo a 
    ON s.codigo = a.codigo
    WHERE a.descrip LIKE ?  
    ORDER BY a.descrip`,
      [`%${description}%`]
    );

  getBySerie = async (serie) =>
    await sendQueryUrbano(
      `
      SELECT 
      a.codigo AS code,
      a.descrip AS description,
      p.nombre AS supplier,
      s.nrocompro AS voucher_s,
      s.fecha AS purchase_date_s,
      c.numero AS voucher_c,
      c.fecha AS purchase_date_c
      FROM serie2 s
      INNER JOIN articulo a
      ON a.codigo = s.codigo
      INNER JOIN provedor p
      ON s.clipro= p.codigo
      LEFT JOIN ctapro c
      ON c.vienede = s.nrocompro
      WHERE serie = ?`,
      [serie]
    );

  getDollarValue = async () => {
    const dollar = await sendQueryUrbano(
      `SELECT * FROM cotiza  WHERE codigo =  'BD'`
    );
    return Number(dollar[0].valorlibre);
  };

  requestProduct = async (
    user,
    product,
    quantity,
    customerName = "",
    obervation = ""
  ) =>
    await sendQueryUrbano(
      `INSERT INTO octmp 
      (fecha, solicitoc, soliciton, codiart, descart, cantidad, cliente, nombre, pedira, espedido, selector, 
      procesado, observa, equipo, operador, oc, rt, estado, provedor) 
      VALUES 
      (NOW(), ?, ?, ?, ?, ?, '', ?, '', 'N', 'G', 'N', ?, 'GSYSTEM', 'GSYSTEM', '', '', 'P', '')`,
      [
        user.code_technical,
        user.first_name,
        product.codigo,
        product.descrip,
        quantity,
        customerName,
        obervation,
      ]
    );

  getOrderList = async () =>
    await sendQueryUrbano(
      `SELECT * FROM octmp o LEFT JOIN clientes c ON o.cliente = c.codigo WHERE o.procesado = 'N'`
    );

  clearOrderList = async () =>
    await sendQueryUrbano(`DELETE FROM octmp WHERE procesado = 'N'`);

  deleteProductOrderList = async (id) =>
    await sendQueryUrbano(
      `DELETE FROM octmp WHERE procesado = 'N' AND codiart = ?`,
      [id]
    );

  removeReservation = async (codigo) =>
    await sendQueryUrbano(
      `UPDATE artstk01 SET reserd01 = reserd01 - 1 WHERE codigo = ?`,
      [codigo]
    );

  removeProductFromOrder = async (order, product) =>
    await sendQueryUrbano(
      `
    DELETE FROM trrenglo 
    WHERE  
    nrocompro = ? AND 
    cliente = ? AND 
    codart= ? AND 
    serie = ? 
    LIMIT 1`,
      [order.nrocompro, order.codigo, product.codigo, product.serie]
    );

  addReservation = async (codigo) =>
    await sendQueryUrbano(
      `UPDATE artstk01 SET reserd01 = reserd01 + 1 WHERE codigo = ?`,
      [codigo]
    );

  addProductIntoOrder = async (order, product) =>
    await sendQueryUrbano(
      `INSERT INTO trrenglo
     (tipo,	sector,	estado,	diag,	serie,	ingreso,	festado,	asignado,	fdiag,	egreso,	cliente,	
       operador,	falla,	diagnostico,	garantia,	tecnico,	codart,	descart,	nrocompro,	seguridad,	
       vienedeop,	observacion,	costo,	orauto,	codartcambio,	descartcambio,	seriecambio,	rvcambio,	pendiente)
       VALUES('ST', 'E', '', 'RE', ?,  NOW(), NOW(), NOW(), NOW(), NOW(), ?, 
       ?, '', '', 0, ?, ?, ?, ?, 'MOSTRADORGABY 00:01',
       '', '',  0,  '',  '',  '',  '',  '',  1)
       `,
      [
        product.serie,
        order.codigo,
        order.operador,
        order.tecnico,
        product.codigo,
        product.descrip,
        order.nrocompro,
      ]
    );
}
