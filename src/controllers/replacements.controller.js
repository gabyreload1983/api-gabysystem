import logger from "../logger/logger.js";
import * as replacementsService from "../services/replacements.service.js";

export const getReplacementById = async (req, res) => {
  try {
    const { id } = req.params;

    const replacement = await replacementsService.getReplacementById(id);
    if (!replacement)
      return res
        .status(404)
        .send({ status: "error", message: "Replacement not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: replacement,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getReplacementByOrderNumber = async (req, res) => {
  try {
    const { code: orderNumber } = req.params;

    const replacement = await replacementsService.getReplacementByOrderNumber(
      orderNumber
    );
    if (!replacement)
      return res
        .status(404)
        .send({ status: "error", message: "Replacement not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: replacement,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getReplacements = async (req, res) => {
  try {
    const replacements = await replacementsService.getReplacements();
    if (!replacements)
      return res
        .status(404)
        .send({ status: "error", message: "Replacements not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: replacements,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const create = async (req, res) => {
  try {
    const { replacement } = req.body;

    const response = await replacementsService.create(replacement);

    if (!response)
      return res
        .status(500)
        .send({ status: "error", message: "Error creating replcement" });

    res.send({
      status: "success",
      message: "OK",
      payload: replacement,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { replacementUpdated } = req.body;

    const replacement = await replacementsService.getReplacementById(id);

    if (!replacement)
      return res
        .status(404)
        .send({ status: "error", message: "Replacement not found" });

    const response = await replacementsService.update(id, replacementUpdated);

    if (!response)
      return res
        .status(500)
        .send({ status: "error", message: "Error updating replcement" });

    res.send({
      status: "success",
      message: "OK",
      payload: replacement,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const replacement = await replacementsService.getReplacementById(id);

    if (!replacement)
      return res
        .status(404)
        .send({ status: "error", message: "Replacement not found" });

    const response = await replacementsService.remove(id);

    if (!response)
      return res
        .status(500)
        .send({ status: "error", message: "Error removing replcement" });

    res.send({
      status: "success",
      message: "OK",
      payload: replacement,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const uploadImages = async (req, res) => {
  try {
    res.send({
      status: "success",
      message: "Se cargaros las imagenes con exito",
      payload: true,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
