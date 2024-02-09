import fs from "fs";
import moment from "moment";
import PDFDocument from "pdfkit";
import bwipjs from "bwip-js";
import {
  __dirname,
  getCodeInvoice,
  getIvaCondition,
  getIvaPercentage,
  getSalerName,
} from "../utils.js";

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
  doc.fontSize(20).text(`${invoice.items[0].letra}`, 290, 40);
  doc
    .fontSize(10)
    .text(`Cod: ${getCodeInvoice(invoice.items[0].letra)}`, 275, 61);
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

  doc.moveTo(40, 170).lineTo(550, 170).stroke();
  doc.moveTo(297.5, 160).lineTo(297.5, 75).stroke();

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

  doc.moveTo(40, 250).lineTo(550, 250).stroke();

  doc.fontSize(10).text(`Codigo`, 50, 260);
  doc.fontSize(10).text(`Cant`, 90, 260);
  doc.fontSize(10).text(`Descripcion`, 130, 260);
  doc.fontSize(10).text(`IVA`, 380, 260);
  doc.fontSize(10).text(`Precio Unit.`, 420, 260);
  doc.fontSize(10).text(`Subtotal`, 480, 260);

  doc.moveTo(40, 270).lineTo(550, 270).stroke();

  //ITEMS
  let itemPosition = 280;
  for (let item of invoice.items) {
    doc.fontSize(8).text(`${item.codiart}`, 50, itemPosition);
    doc
      .fontSize(8)
      .text(`${Number(item.cantidad).toFixed()}`, 100, itemPosition);
    doc.fontSize(8).text(`${item.descart}`, 130, itemPosition);
    doc
      .fontSize(8)
      .text(`${getIvaPercentage(item.grabado)}`, 380, itemPosition);
    doc
      .fontSize(8)
      .text(`${Number(item.precio).toFixed(2)}`, 420, itemPosition);
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
      (Number(invoice.items[0].iva1) + Number(invoice.items[0].iva2))
    ).toFixed(2);
    const IVA = (
      Number(invoice.items[0].iva1) + Number(invoice.items[0].iva2)
    ).toFixed(2);
    doc.fontSize(10).text(`SUBTOTAL: `, 350, 700);
    doc.fontSize(10).text(`$ ${SUBTOTAL}`, 450, 700);
    doc.fontSize(10).text(`IVA:`, 350, 720);
    doc.fontSize(10).text(`$ ${IVA}`, 450, 720);
  }

  doc.fontSize(11).text(`TOTAL:`, 350, 740);
  doc.fontSize(11).text(`$ ${TOTAL}`, 450, 740);

  doc.moveTo(40, 780).lineTo(550, 780).stroke();

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  return pdfPath;
};
