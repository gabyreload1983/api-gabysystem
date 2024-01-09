import { CronJob } from "cron";
import * as salesCommissionService from "../services/salesCommission.service.js";
import * as invoicesService from "../services/invoices.service.js";

import logger from "../logger/logger.js";
import SalesCommissionCreateDto from "../dao/DTOs/SalesCommissionCreate.dto.js";
import moment from "moment";

const getSalesCommissions = async () => {
  try {
    const now = moment().format("YYYY-MM-DD 00:00:00");

    let invoices = await invoicesService.getInvoicesCommission(now);
    if (!invoices.length) return;
    invoices = invoices.map((invoice) => new SalesCommissionCreateDto(invoice));
    for (let invoice of invoices) await salesCommissionService.create(invoice);
  } catch (error) {
    logger.error(error.message);
  }
};

const jobReadingSalesCommission = new CronJob(
  "0 * * * * *", // cronTime s m h dom mon dow
  getSalesCommissions, // onTick
  null, // onComplete
  true, // start
  "America/Argentina/Buenos_Aires" // timeZone
);
