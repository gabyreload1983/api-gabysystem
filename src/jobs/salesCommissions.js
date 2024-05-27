import { CronJob } from "cron";
import * as salesCommissionService from "../services/salesCommission.service.js";

import logger from "../logger/logger.js";
import moment from "moment";
import { trueStringToBoolean } from "../utils.js";

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
  trueStringToBoolean(process.env.ENABLE_JOBS), // start
  "America/Argentina/Buenos_Aires" // timeZone
);
