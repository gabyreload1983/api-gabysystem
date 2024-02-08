import fs from "fs";
import moment from "moment";
import PDFDocument from "pdfkit";
import { __dirname, getIvaCondition } from "../utils.js";

export const buildOrderPdf = (order, user, date) => {
  const year = moment(date).format("YYYY");
  const now = moment(date).format("YYYYMMDD-HHmmss");
  const fileName = `${order.nrocompro}-${now}.pdf`;
  const pdfPath = `${__dirname}/public/pdfHistory/${fileName}`;

  const doc = new PDFDocument({ size: "A4" });

  doc.image(`${__dirname}/public/images/logo2.png`, 50, 30, {
    width: 100,
  });

  doc
    .fontSize(10)
    .text(`FECHA: ${moment().format("DD-MM-YYYY HH:mm")}`, 350, 50);
  doc
    .fontSize(10)
    .text(`RESPONSABLE: ${user.first_name} ${user.last_name}`, 350, 70);
  doc.fontSize(10).text(`TECNICO: ${order.tecnico}`, 350, 90);

  doc.fontSize(14).text(`ORDEN: ${order.nrocompro}`, 50, 140);
  doc.fontSize(14).text(`CLIENTE: ${order.nombre}`, 50, 160);
  doc.moveTo(40, 200).lineTo(550, 200).stroke();
  doc.fontSize(14).text("ARTICULOS", 50, 230);
  let position = 240;
  for (let product of order.products) {
    doc
      .fontSize(10)
      .text(
        `${product.codigo} - ${product.descrip} - ${product.serie}`,
        70,
        (position += 20)
      );
  }
  doc
    .fontSize(12)
    .text(`${year} - GabySystem - V${process.env.API_VERSION}`, 210, 730);
  doc.fontSize(12).text(`(Developed) => Gabriel Godoy  `, 200, 750);

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  return { pdfPath, fileName };
};

export const buildInvoicePdf = (invoice) => {
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
  doc.moveTo(40, 170).lineTo(550, 170).stroke();
  doc.moveTo(297.5, 160).lineTo(297.5, 75).stroke();
  doc.moveTo(40, 250).lineTo(550, 250).stroke();
  doc.moveTo(40, 270).lineTo(550, 270).stroke();
  doc.moveTo(40, 690).lineTo(550, 690).stroke();
  doc.moveTo(40, 780).lineTo(550, 780).stroke();

  // HEADER
  doc.fontSize(8).text(`${ADDRESS}`, 40, 110);
  doc.fontSize(8).text(`${PHONE}`, 40, 120);
  doc.fontSize(8).text(`${EMAIL}`, 40, 130);
  doc.fontSize(10).text(`${TAX_CONDITION}`, 40, 150);

  doc.fontSize(14).text(`FACTURA`, 375, 25);
  doc
    .fontSize(14)
    .text(
      `Nº 00${invoice.items[0].puesto}-000${invoice.items[0].numero}`,
      375,
      45
    );
  doc.fontSize(10).text(`FECHA: 15/12/2023 10:56`, 375, 65);
  doc.fontSize(10).text(`ORIGINAL`, 375, 78);

  doc.fontSize(10).text(`CUIT: ${CUIT}`, 395, 115);
  doc.fontSize(10).text(`Ing Brutos: ${INGRESOS_BRUTOS}`, 395, 127);
  doc.fontSize(10).text(`Inicio de Act.: ${START_OF_ACTIVITY}`, 395, 139);

  // CUSTOMER
  doc
    .fontSize(10)
    .text(`${invoice.items[0].codigo} - ${invoice.items[0].nombre}`, 50, 180);
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
    .text(`${getIvaCondition(invoice.items[0].tipoiva)}`, 50, 225);
  doc.fontSize(10).text(`${invoice.items[0].cuit}`, 50, 235);

  // ITEMS HEADERS
  doc.fontSize(10).text(`Codigo`, 50, 260);
  doc.fontSize(10).text(`Cant`, 90, 260);
  doc.fontSize(10).text(`Descripcion`, 130, 260);
  doc.fontSize(10).text(`IVA`, 380, 260);
  doc.fontSize(10).text(`Precio Unit.`, 420, 260);
  doc.fontSize(10).text(`Subtotal`, 480, 260);

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  return pdfPath;
};
