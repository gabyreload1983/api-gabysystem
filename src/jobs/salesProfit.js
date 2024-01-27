import { CronJob } from "cron";
import * as salesCommissionService from "../services/salesCommission.service.js";
import * as alexisAccountService from "../services/alexisAccount.service.js";

import logger from "../logger/logger.js";

const applySalesProfitToAccount = async () => {
  try {
    const sales = await salesCommissionService.getFilter({
      isProfitApply: false,
      deliveryState: true,
      invoiceState: "pay",
    });
    for (const sale of sales) {
      const response = await alexisAccountService.create(sale);
      if (response) {
        sale.isProfitApply = true;
        await salesCommissionService.updateSale(sale);
      }
    }
  } catch (error) {
    logger.error(error.message);
  }
};

const job = new CronJob(
  "0 * * * * *", // cronTime s m h dom mon dow
  applySalesProfitToAccount, // onTick
  null, // onComplete
  true, // start
  "America/Argentina/Buenos_Aires" // timeZone
);
