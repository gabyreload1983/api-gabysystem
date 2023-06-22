import logger from "../logger/logger.js";
import * as productService from "../services/products.service.js";

export const searchBy = async (req, res) => {
  try {
    const { code, ean, description, stock = true } = req.query;
    if (!code && !ean && !description)
      return res
        .status(400)
        .send({ status: "error", message: "You send an invalid search query" });

    const products = await productService.searchBy(
      code,
      ean,
      description,
      stock
    );
    if (!products)
      return res
        .status(404)
        .send({ status: "error", message: "Error searching product" });

    res.send({ status: "success", products });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
