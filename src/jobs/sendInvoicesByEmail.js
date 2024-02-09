import { CronJob } from "cron";
import * as invoicesService from "../services/invoices.service.js";

import logger from "../logger/logger.js";
import moment from "moment";
import { buildInvoicePdf } from "../pdfKit/pdfKit.js";
import sendMail from "../nodemailer/config.js";
import { getHtmlInvoicesPending } from "../nodemailer/html/utilsHtml.js";

const sendInvoicesByEmail = async () => {
  try {
    const from = moment().format("YYYY-MM-01 00:00:00");
    const to = moment().format("YYYY-MM-01 23:59:59");

    const invoices = await invoicesService.getInvoicesPending(from, to);

    if (invoices && invoices.length) {
      for (let invoice of invoices) {
        if (invoice.items[0].mail) {
          const pdfPath = await buildInvoicePdf(invoice);
          console.log(pdfPath);
          await sendMail(
            "gabyreload@gmail.com",
            `FACTURA ${invoice.invoiceId}`,
            "TEXT...",
            getHtmlInvoicesPending(invoice),
            pdfPath,
            process.env.MAIL_BCC
          );
          break;
        }
      }
    }
  } catch (error) {
    logger.error(error.message);
  }
};

sendInvoicesByEmail();

// const job = new CronJob(
//   "29 * * * * *", // cronTime s m h dom mon dow
//   sendInvoicesByEmail, // onTick
//   null, // onComplete
//   true, // start
//   "America/Argentina/Buenos_Aires" // timeZone
// );
