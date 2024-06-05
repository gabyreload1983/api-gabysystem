import { sendQueryUrbano } from "./sqlUtils.js";

export default class Products {
  constructor() {}

  getByCode = async (code, stock) =>
    await sendQueryUrbano(
      `
      SELECT *
      FROM artstk01 s
      INNER JOIN articulo a 
      ON s.codigo = a.codigo
      WHERE a.codigo = ? AND (s.stockd01 - s.reserd01) > 0`,
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

  getByDescription = async (description, stock) =>
    await sendQueryUrbano(
      `
    SELECT *
    FROM artstk01 s
    INNER JOIN articulo a 
    ON s.codigo = a.codigo
    WHERE a.descrip LIKE ? AND (s.stockd01 - s.reserd01) > 0 
    ORDER BY a.descrip`,
      [`%${description}%`]
    );

  getBySerie = async (serie) =>
    await sendQueryUrbano(
      `
    SELECT * FROM articulo a
    INNER JOIN serie2 s
    ON a.codigo = s.codigo
    WHERE s.serie = ? LIMIT 1`,
      [serie]
    );

  getDollarValue = async () => {
    const dollar = await sendQueryUrbano(
      `SELECT * FROM cotiza  WHERE codigo =  'BD'`
    );
    return Number(dollar[0].valorlibre);
  };

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
