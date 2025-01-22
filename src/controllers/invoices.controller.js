import logger from "../logger/logger.js";
import * as invoicesService from "../services/invoices.service.js";

export const getOverdueInvoices = async (req, res) => {
  try {
    const { from, to, condition } = req.query;
    if (!from || !to)
      return res
        .status(400)
        .send({ status: "error", message: "You send an invalid search query" });

    const invoices = await invoicesService.getOverdueInvoices(
      from,
      to,
      condition
    );
    if (!invoices)
      return res
        .status(404)
        .send({ status: "error", message: "Error searching invoices" });

    res.send({ status: "success", payload: invoices });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
