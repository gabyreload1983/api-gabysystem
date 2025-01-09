import { CronJob } from "cron";
import * as invoicesService from "../services/invoices.service.js";

import logger from "../logger/logger.js";
import moment from "moment";
import { buildInvoicePdf } from "../pdfKit/pdfKit.js";
import sendMail from "../nodemailer/config.js";
import { getHtmlOverDueInvoicesPending } from "../nodemailer/html/utilsHtml.js";
import { trueStringToBoolean } from "../utils.js";

const sendOverdueInvoicesByEmail = async () => {
  try {
    const from = moment().subtract(1, "month").format("YYYY-MM-DD 00:00:00");
    const to = moment().subtract(1, "month").format("YYYY-MM-DD 23:59:59");

    const invoices = await invoicesService.getOverdueInvoicesByCondition(
      from,
      to
    );

    if (invoices && invoices?.length) {
      const invoicesWithMail = invoices.filter(
        (invoice) => invoice.items[0].mail
      );
      const invoicesWithOutMail = invoices.filter(
        (invoice) => !invoice.items[0].mail
      );

      for (let invoices of invoicesWithMail) {
        const pdfPath = await buildInvoicePdf(invoices);
        await sendMail(
          invoices.items[0].mail,
          `FACTURA ${invoices.invoiceId} VENCIDA`,
          `FACTURA ${invoices.invoiceId} VENCIDA`,
          getHtmlOverDueInvoicesPending(invoices),
          [{ path: pdfPath }],
          process.env.MAIL_BCC,
          "comprobantes"
        );
      }

      if (invoicesWithOutMail.length) {
        const pdfArray = [];
        for (let invoices of invoicesWithOutMail) {
          const pdfPath = await buildInvoicePdf(invoices);
          pdfArray.push({ path: pdfPath });
        }

        await sendMail(
          process.env.MAIL_FROM_COMPROBANTES,
          "INFO FACTURAS VENCIDAS SIN MAIL",
          "INFO FACTURAS VENCIDAS SIN MAIL",
          `<p>Se adjuntan ${invoicesWithOutMail.length} facturas vencidas sin mail y con saldo.`,
          pdfArray
        );
      }

      await sendMail(
        process.env.MAIL_FROM_COMPROBANTES,
        "INFO FACTURAS VENCIDAS",
        "INFO FACTURAS VENCIDAS",
        `<p>Se enviaron ${invoicesWithMail.length} facturas vencidas en PDF por mail.`
      );
    }
  } catch (error) {
    logger.error(error.message);
    await sendMail(
      process.env.MAIL_FROM_COMPROBANTES,
      "ERROR INFO FACTURAS VENCIDAS",
      "ERROR INFO FACTURAS VENCIDAS",
      `<p>Error: ${error.message}`
    );
  }
};

if (process.env.NODE_APP_INSTANCE === "0") {
  const job = new CronJob(
    "0 0 9 * * *", // cronTime s m h dom mon dow
    sendOverdueInvoicesByEmail, // onTick
    null, // onComplete
    trueStringToBoolean(process.env.ENABLE_JOBS), // start
    "America/Argentina/Buenos_Aires" // timeZone
  );
}
