import fs from "fs";
import moment from "moment";
import PDFDocument from "pdfkit";
import { __dirname } from "../utils.js";
import config from "../config/config.js";

export const buildOrderPdf = (order, user) => {
  const year = moment().format("YYYY");
  const now = moment().format("YYYYMMDD-HHmmss");
  const pdfPath = `${__dirname}/public/pdfHistory/${order.nrocompro}-${now}.pdf`;

  const doc = new PDFDocument({ size: "A4" });

  doc.image(`${__dirname}/public/images/logo-sinapsis.jpg`, 20, 30, {
    width: 300,
  });

  doc
    .fontSize(10)
    .text(`FECHA: ${moment().format("DD-MM-YYYY HH:mm")}`, 350, 50);
  doc
    .fontSize(10)
    .text(`RESPONSABLE: ${user.first_name} ${user.last_name}`, 350, 70);
  doc.fontSize(14).text(`${order.nrocompro}`, 50, 130);
  doc.fontSize(14).text(`${order.nombre}`, 50, 150);
  doc.fontSize(14).text(`TECNICO: ${order.tecnico}`, 50, 170);
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
    .text(`${year} - GabySystem - V${config.api_version}`, 210, 730);
  doc.fontSize(12).text(`(Developed) => Gabriel Godoy  `, 200, 750);

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  return pdfPath;
};
