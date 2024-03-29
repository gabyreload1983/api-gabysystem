import { CronJob } from "cron";
import * as salesCommissionService from "../services/salesCommission.service.js";

import logger from "../logger/logger.js";
import moment from "moment";

const getSalesCommissions = async () => {
  try {
    const from = moment().format("YYYY-MM-01 00:00:00");
    const to = moment().format("YYYY-MM-DD 23:59:59");

    await salesCommissionService.refresh(from, to);
  } catch (error) {
    logger.error(error.message);
  }
};

const job = new CronJob(
  "0 * * * * *", // cronTime s m h dom mon dow
  getSalesCommissions, // onTick
  null, // onComplete
  true, // start
  "America/Argentina/Buenos_Aires" // timeZone
);
