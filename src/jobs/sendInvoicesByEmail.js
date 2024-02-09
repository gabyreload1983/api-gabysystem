import { CronJob } from "cron";
import * as invoicesService from "../services/invoices.service.js";

import logger from "../logger/logger.js";
import moment from "moment";
import { buildInvoicePdf } from "../pdfKit/pdfKit.js";
import sendMail from "../nodemailer/config.js";
import { getHtmlInvoicesPending } from "../nodemailer/html/utilsHtml.js";

const sendInvoicesByEmail = async () => {
  try {
    const from = moment().format("YYYY-MM-DD 00:00:00");
    const to = moment().format("YYYY-MM-DD 23:59:59");

    const invoices = await invoicesService.getInvoicesPending(from, to);

    if (invoices && invoices?.length) {
      const invoicesWithMail = invoices.filter(
        (invoice) => invoice.items[0].mail
      );
      const invoicesWithOutMail = invoices.filter(
        (invoice) => !invoice.items[0].mail
      );

      for (let invoice of invoicesWithMail) {
        const pdfPath = await buildInvoicePdf(invoice);
        await sendMail(
          invoice.items[0].mail,
          `FACTURA ${invoice.invoiceId}`,
          "FACTURA ${invoice.invoiceId}",
          getHtmlInvoicesPending(invoice),
          [{ path: pdfPath }],
          null,
          "comprobantes"
        );
      }

      if (invoicesWithOutMail.length) {
        const pdfArray = [];
        for (let invoice of invoicesWithOutMail) {
          const pdfPath = await buildInvoicePdf(invoice);
          pdfArray.push({ path: pdfPath });
        }

        await sendMail(
          process.env.MAIL_FROM_COMPROBANTES,
          "INFO FACTURAS SIN MAIL",
          "INFO FACTURAS SIN MAIL",
          `<p>Se adjuntan ${invoicesWithOutMail.length} facturas sin mail y con saldo.`,
          pdfArray
        );
      }

      await sendMail(
        process.env.MAIL_FROM_COMPROBANTES,
        "INFO FACTURAS PDF",
        "INFO FACTURAS PDF",
        `<p>Se enviaron ${invoicesWithMail.length} facturas en PDF por mail.`
      );
    }
  } catch (error) {
    logger.error(error.message);
    await sendMail(
      process.env.MAIL_FROM_COMPROBANTES,
      "ERROR INFO FACTURAS",
      "ERROR INFO FACTURAS",
      `<p>Error: ${error.message}`
    );
  }
};

const job = new CronJob(
  "0 30 20 * * *", // cronTime s m h dom mon dow
  sendInvoicesByEmail, // onTick
  null, // onComplete
  true, // start
  "America/Argentina/Buenos_Aires" // timeZone
);
