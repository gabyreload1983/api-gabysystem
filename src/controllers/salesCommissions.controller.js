import logger from "../logger/logger.js";
import * as salesCommissionsService from "../services/salesCommission.service.js";

export const getSales = async (req, res) => {
  try {
    const sales = await salesCommissionsService.getAll();

    res.send({
      status: "success",
      message: `OK`,
      payload: sales,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
