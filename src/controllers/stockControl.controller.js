import logger from "../logger/logger.js";
import * as stockControlService from "../services/stockControl.service.js";

export const getStockControl = async (req, res) => {
  try {
    const { id } = req.params;

    const stockControl = await stockControlService.getStockControl(id);
    if (!stockControl)
      return res
        .status(404)
        .send({ status: "error", message: "StockControl not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: stockControl,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getStockControlByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const stockControl = await stockControlService.getStockControlByCode(code);
    if (!stockControl)
      return res
        .status(404)
        .send({ status: "error", message: "StockControl not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: stockControl,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getStockControls = async (req, res) => {
  try {
    const { status } = req.query;

    const stockControls = await stockControlService.getStockControls({
      status,
    });
    if (!stockControls)
      return res
        .status(404)
        .send({ status: "error", message: "StockControls not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: stockControls,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const create = async (req, res) => {
  try {
    const stockControl = req.body;

    const createdStockControl = await stockControlService.create(stockControl);

    res.send({
      status: "success",
      message: "StockControl created",
      payload: createdStockControl,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const stockControlUpdate = req.body;

    const updatedStockControl = await stockControlService.update(
      id,
      stockControlUpdate
    );

    res.send({
      status: "success",
      message: "StockControl updated",
      payload: updatedStockControl,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await stockControlService.remove(id);

    res.send({
      status: "success",
      message: "StockControl deleted",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
