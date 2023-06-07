import logger from "../logger/logger.js";
import * as productService from "../services/products.service.js";

export const searchBy = async (req, res) => {
  try {
    const { code, ean, description, stock = true } = req.query;
    if (!code && !ean && !description)
      return res
        .status(400)
        .send({ status: "error", message: "You send an invalid search query" });

    const payload = await productService.searchBy(
      code,
      ean,
      description,
      stock
    );
    if (!payload.products)
      return res
        .status(404)
        .send({ status: "error", message: "No product was found" });

    res.send({ status: "success", payload });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
