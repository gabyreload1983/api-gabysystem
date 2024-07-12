import fs from "fs";
import moment from "moment";
import PDFDocument from "pdfkit";
import bwipjs from "bwip-js";
import {
  __dirname,
  decodeOrderTier,
  getCodeInvoice,
  getIvaCondition,
  getIvaPercentage,
  getSalerName,
} from "../utils.js";
import { API_INFO, LEYEND_ORDER } from "../config/info.js";
import * as usersService from "../services/users.service.js";

export const buildOrderPDF = async (order, user, customer = false) => {
  const year = moment().format("YYYY");
  const dateIn = moment(order.ingresado).format("DD-MM-YYYY HH:mm");
  const fileName = `${order.nrocompro}`;

  const pdfPath = customer
    ? `${__dirname}/public/pdfHistory/customers/${fileName}.pdf`
    : `${__dirname}/public/pdfHistory/orders/${fileName}.pdf`;

  const doc = new PDFDocument({ size: "A4" });

  doc.fontSize(14).text(`SINAPSIS SRL`, 50, 40);
  doc.image(`${__dirname}/public/images/logo2.png`, 250, 30, {
    width: 30,
  });
  doc.fontSize(10).text(`AV San Martin 2144`, 50, 65);
  doc.fontSize(10).text(`3476-43122 / 3476-309819`, 50, 77);
  doc.fontSize(10).text(`info@sinapsis.com.ar`, 50, 89);
  doc.fontSize(10).text(`Alias Banco BBVA: sinapsisbbva`, 50, 101);

  doc.fontSize(14).text(`ORDEN: ${order.nrocompro}`, 340, 40);
  doc.fontSize(10).text(`FECHA: ${dateIn}`, 340, 60);
  if (order.operador) {
    const operador = await usersService.getByCode(order.operador);
    if (operador) {
      doc
        .fontSize(10)
        .text(`USUARIO: ${operador.first_name} ${operador.last_name}`, 340, 75);
    } else {
      doc.fontSize(10).text(`USUARIO: ${order.operador}`, 340, 75);
    }
  } else {
    doc
      .fontSize(10)
      .text(`USUARIO: ${user.first_name} ${user.last_name}`, 340, 75);
  }
  doc
    .fontSize(10)
    .text(`PRIORIDAD: ${decodeOrderTier(order.prioridad)}`, 340, 90);
  if (order.tecnico && !customer) {
    doc.fontSize(10).text(`TECNICO: ${order.tecnico}`, 340, 105);
  }

  doc.moveTo(40, 120).lineTo(550, 120).stroke();

  doc.fontSize(14).text(`${order.codigo} - ${order.nombre}`, 50, 130);
  doc.fontSize(10).text(`DIRECCION: ${order.direccion}`, 50, 150);
  doc.fontSize(10).text(`TELEFONO: ${order.telefono || ""}`, 340, 150);
  doc.fontSize(10).text(`MAIL: ${order.mail || ""}`, 340, 165);

  doc.moveTo(40, 190).lineTo(550, 190).stroke();

  doc.fontSize(14).text(`ARTICULO: ${order.descart.toUpperCase()}`, 50, 200);
  doc.fontSize(12).text(`ACCESORIOS: ${order.accesorios}`, 50, 220);
  if (customer) {
    doc.fontSize(12).text(`FALLA:`, 50, 235);
    doc.fontSize(10).text(`${order.falla}`, 50, 250);
  }

  if (!customer) {
    doc.moveTo(40, 250).lineTo(550, 250).stroke();
    doc.fontSize(12).text("PODUCTOS EN ORDEN", 50, 260);
    doc.fontSize(10).text("CODIGO", 50, 280);
    doc.fontSize(10).text("DESCRIPCION", 100, 280);
    doc.fontSize(10).text("SERIE", 400, 280);
    let positionX = 295;
    let positionY = 50;
    for (let product of order.products) {
      doc.fontSize(10).text(`${product.codigo}`, positionY, positionX);
      doc.fontSize(10).text(`${product.descrip}`, positionY + 50, positionX);
      doc.fontSize(10).text(`${product.serie}`, positionY + 350, positionX);
      positionX += 20;
    }
  }

  if (customer) {
    doc.moveTo(40, 450).lineTo(550, 450).stroke();
    doc.fontSize(8).text(LEYEND_ORDER, 40, 460);
    doc.moveTo(40, 530).lineTo(550, 530).stroke();

    doc.fontSize(10).text(`FIRMA:`, 50, 580);
    doc.moveTo(140, 590).lineTo(300, 590).stroke();
    doc.fontSize(10).text(`ACLARACION:`, 50, 620);
    doc.moveTo(140, 630).lineTo(300, 630).stroke();
    doc.fontSize(10).text(`DNI:`, 50, 660);
    doc.moveTo(140, 670).lineTo(300, 670).stroke();
  }
  doc.fontSize(12).text(`Sinapsis SRL`, 250, 730);
  doc.fontSize(12).text(`${year} - GSystem - V${API_INFO.version}`, 210, 750);

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  return { pdfPath, fileName };
};

export const buildInvoicePdf = async (invoice) => {
  const fileName = `${invoice.invoiceId}.pdf`;
  const pdfPath = `${__dirname}/public/pdfInvoices/${fileName}`;
  const ADDRESS = "Av San Martin 2144 - CP2200 San Lorenzo - Santa Fe";
  const PHONE = "54-03476-431222";
  const EMAIL = "info@sinapis.com.ar";
  const TAX_CONDITION = "RESPONSABLE INSCRIPTO";
  const CUIT = "30-71138289-1";
  const INGRESOS_BRUTOS = "091-043821-8";
  const START_OF_ACTIVITY = "20/05/2010";

  const doc = new PDFDocument({ size: "A4" });

  doc.image(`${__dirname}/public/images/logo-sinapsis.jpg`, 5, 5, {
    width: 300,
  });

  // LINES

  // HEADER
  doc.font("Times-Roman");
  doc.fontSize(20).text(`${invoice.items[0].letra}`, 290, 40);
  doc
    .fontSize(10)
    .text(`Cod: ${getCodeInvoice(invoice.items[0].letra)}`, 275, 61);
  doc.fontSize(8).text(`${ADDRESS}`, 40, 110);
  doc.fontSize(8).text(`${PHONE}`, 40, 120);
  doc.fontSize(8).text(`${EMAIL}`, 40, 130);
  doc.fontSize(10).text(`${TAX_CONDITION}`, 40, 150);

  doc.font("Times-Bold");
  doc.fontSize(14).text(`FACTURA`, 375, 25);

  doc
    .fontSize(14)
    .text(
      `Nº 00${invoice.items[0].puesto}-000${invoice.items[0].invoiceNumber}`,
      375,
      45
    );

  doc.font("Times-Roman");
  doc
    .fontSize(10)
    .text(
      `FECHA: ${moment(invoice.items[0].fecha).format("DD-MM-YYYY hh:mm")}`,
      375,
      65
    );
  doc.fontSize(10).text(`ORIGINAL`, 375, 78);

  doc.fontSize(10).text(`CUIT: ${CUIT}`, 395, 115);
  doc.fontSize(10).text(`Ing Brutos: ${INGRESOS_BRUTOS}`, 395, 127);
  doc.fontSize(10).text(`Inicio de Act.: ${START_OF_ACTIVITY}`, 395, 139);

  doc.moveTo(40, 170).lineTo(550, 170).stroke();
  doc.moveTo(297.5, 160).lineTo(297.5, 75).stroke();

  // CUSTOMER
  doc.font("Times-Bold");
  doc
    .fontSize(12)
    .text(`${invoice.items[0].codigo} - ${invoice.items[0].name}`, 50, 180);
  doc.font("Times-Roman");
  doc.fontSize(8).text(`${invoice.items[0].direccion}`, 50, 195);
  doc
    .fontSize(8)
    .text(
      `${invoice.items[0].npostal} - ${invoice.items[0].ciudad} - ${invoice.items[0].state}`,
      50,
      205
    );
  doc
    .fontSize(10)
    .text(`${getIvaCondition(invoice.items[0].tipoiva)}`, 50, 235);
  doc.fontSize(10).text(`${invoice.items[0].cuit}`, 180, 235);
  doc.fontSize(10).text(`${invoice.items[0].textofac}`, 380, 235);

  // ITEMS HEADERS

  doc.moveTo(40, 250).lineTo(550, 250).stroke();

  doc.fontSize(10).text(`Cant`, 50, 260);
  doc.fontSize(10).text(`Codigo`, 90, 260);
  doc.fontSize(10).text(`Descripcion`, 130, 260);
  doc.fontSize(10).text(`IVA`, 360, 260);
  doc.fontSize(10).text(`Precio Unit.`, 400, 260);
  doc.fontSize(10).text(`Subtotal`, 480, 260);

  doc.moveTo(40, 270).lineTo(550, 270).stroke();

  //ITEMS
  let itemPosition = 280;
  for (let item of invoice.items) {
    doc
      .fontSize(8)
      .text(`${Number(item.cantidad).toFixed()}`, 50, itemPosition);
    doc.fontSize(8).text(`${item.codiart}`, 90, itemPosition);
    doc.fontSize(8).text(`${item.descart}`, 130, itemPosition);
    doc
      .fontSize(8)
      .text(`${getIvaPercentage(item.grabado)}`, 360, itemPosition);
    doc
      .fontSize(8)
      .text(`${Number(item.precio).toFixed(2)}`, 400, itemPosition);
    doc
      .fontSize(8)
      .text(`${Number(item.subtotal).toFixed(2)}`, 480, itemPosition);

    itemPosition += 20;
  }

  // QR

  const barcodeValueQr =
    "https://serviciosweb.afip.gob.ar/genericos/comprobantes/cae.aspx";

  const barcodeOptsQr = {
    bcid: "qrcode",
    text: barcodeValueQr,
  };

  const pngQr = await bwipjs.toBuffer(barcodeOptsQr);

  doc.image(pngQr, 480, 610, {
    width: 70,
  });

  // FOOTER

  doc
    .fontSize(10)
    .text(
      `Vendedor: ${getSalerName(invoice.items[0].operador).toUpperCase()}`,
      50,
      710
    );

  const barcodeValueCae = invoice.items[0].cae;

  const barcodeOptsCae = {
    bcid: "code39",
    text: barcodeValueCae,
    height: 9,
    includetext: true,
    textxalign: "left",
    textyoffset: 2,
  };

  const pngCae = await bwipjs.toBuffer(barcodeOptsCae);

  doc.image(pngCae, 50, 730, {
    width: 150,
  });

  doc
    .fontSize(8)
    .text(
      `Nº CAE: ${invoice.items[0].cae} Vencimiento: ${moment(
        invoice.items[0].fvcae
      ).format("DD-MM-YYYY")}`,
      50,
      760
    );

  const TOTAL = Number(invoice.items[0].importe).toFixed(2);

  doc.moveTo(40, 690).lineTo(550, 690).stroke();
  if (invoice.items[0].letra === "A") {
    const SUBTOTAL = (
      Number(invoice.items[0].importe) -
      (Number(invoice.items[0].iva1) + Number(invoice.items[0].iva3))
    ).toFixed(2);
    const IVA = (
      Number(invoice.items[0].iva1) + Number(invoice.items[0].iva3)
    ).toFixed(2);
    doc.fontSize(10).text(`SUBTOTAL: `, 350, 700);
    doc.fontSize(10).text(`$ ${SUBTOTAL}`, 450, 700);
    doc.fontSize(10).text(`IVA:`, 350, 720);
    doc.fontSize(10).text(`$ ${IVA}`, 450, 720);
  }

  doc.font("Times-Bold");
  doc.fontSize(12).text(`TOTAL:`, 350, 750);
  doc.fontSize(12).text(`$ ${TOTAL}`, 450, 750);

  doc.font("Times-Roman");
  doc.moveTo(40, 780).lineTo(550, 780).stroke();

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  return pdfPath;
};
