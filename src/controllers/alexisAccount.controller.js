import logger from "../logger/logger.js";
import * as alexisAccountService from "../services/alexisAccount.service.js";

export const getAll = async (req, res) => {
  try {
    const { year } = req.query;

    const balance = await alexisAccountService.getAll(year);
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

export const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await alexisAccountService.findByInternalId(id);
    res.send({
      status: "success",
      message: `OK`,
      payload: item,
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

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await alexisAccountService.findByInternalId(id);
    if (!item)
      return res.status(404).send({
        status: "error",
        message: `Item not found`,
        payload: response,
      });

    const response = await alexisAccountService.remove(item._id);
    if (!response)
      return res.status(400).send({
        status: "error",
        message: `Error deleting item`,
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
