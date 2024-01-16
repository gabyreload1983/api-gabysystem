import logger from "../logger/logger.js";
import * as commissionsBalanceService from "../services/commissionsBalance.service.js";

export const getAll = async (req, res) => {
  try {
    const balance = await commissionsBalanceService.getAll();
    res.send({
      status: "success",
      message: `OK`,
      payload: balance,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
