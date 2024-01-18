import logger from "../logger/logger.js";
import * as commissionsService from "../services/commissions.service.js";

export const getAll = async (req, res) => {
  try {
    const { from, to } = req.query;

    const balance = await commissionsService.getAll(from, to);
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

export const create = async (req, res) => {
  try {
    const { sale } = req.body;

    const response = await commissionsService.create(sale);
    if (!response)
      return res.status(400).send({
        status: "error",
        message: `Duplicate invoice`,
        payload: response,
      });

    res.send({
      status: "success",
      message: `OK`,
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
