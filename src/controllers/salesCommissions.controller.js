import logger from "../logger/logger.js";
import * as salesCommissionService from "../services/salesCommission.service.js";

export const getSales = async (req, res) => {
  try {
    const sales = await salesCommissionService.getAll();

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
    const sale = await salesCommissionService.getByInvoice(id);
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

export const applyInvoices = async (req, res) => {
  try {
    const { from, to } = req.body;
    if (!from || !to)
      return res
        .status(400)
        .send({ status: "error", message: "Must send from an to dates" });

    const response = await salesCommissionService.applyInvoices(from, to);
    if (!response)
      return res.status(404).send({
        status: "error",
        message: `No invoices between that dates`,
      });

    res.send({
      status: "success",
      message: `New invoices was apply and save in Mongodb`,
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
