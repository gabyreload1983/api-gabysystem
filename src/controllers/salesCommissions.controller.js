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

export const getSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesCommissionsService.getByInvoice(id);
    if (!sale)
      return res
        .status(404)
        .send({ status: "error", message: "Invoices not found" });

    res.send({
      status: "success",
      message: `OK`,
      payload: sale,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
