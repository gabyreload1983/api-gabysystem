import { CronJob } from "cron";
import * as invoicesService from "../services/invoices.service.js";

import logger from "../logger/logger.js";
import moment from "moment";
import { buildInvoicePdf } from "../pdfKit/pdfKit.js";

const sendInvoicesByEmail = async () => {
  try {
    const from = moment().format("YYYY-MM-01 00:00:00");
    const to = moment().format("YYYY-MM-DD 23:59:59");

    const invoices = await invoicesService.getInvoices(from, to);
    console.log(invoices[0]);
    if (invoices && invoices.length) {
      const pdfPath = buildInvoicePdf(invoices[0]);
      console.log(pdfPath);
    }
  } catch (error) {
    logger.error(error.message);
  }
};

const job = new CronJob(
  "29 * * * * *", // cronTime s m h dom mon dow
  sendInvoicesByEmail, // onTick
  null, // onComplete
  true, // start
  "America/Argentina/Buenos_Aires" // timeZone
);
