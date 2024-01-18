import logger from "../logger/logger.js";
import * as alexisAccountService from "../services/alexisAccount.service.js";

export const getAll = async (req, res) => {
  try {
    const { from, to } = req.query;

    const balance = await alexisAccountService.getAll(from, to);
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
    const { item } = req.body;
    const response = await alexisAccountService.create(item);
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
