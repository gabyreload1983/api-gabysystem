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

    res.send({ status: "success", payload: products });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const searchBySerie = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    if (!serialNumber)
      return res
        .status(400)
        .send({ status: "error", message: "You must send a serial number" });

    const product = await productService.searchBySerie(serialNumber);
    if (!product)
      return res
        .status(404)
        .send({ status: "error", message: "Error searching product" });

    res.send({ status: "success", payload: product });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getOrderList = async (req, res) => {
  try {
    const products = await productService.getOrderList();
    if (!products)
      return res
        .status(404)
        .send({ status: "error", message: "Error searching order list" });

    res.send({ status: "success", payload: products });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const clearOrderList = async (req, res) => {
  try {
    const response = await productService.clearOrderList();
    if (!response)
      return res
        .status(404)
        .send({ status: "error", message: "Error updating order list" });

    res.send({
      status: "success",
      message: "Clear Order List successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const deleteProductOrderList = async (req, res) => {
  try {
    const { productId: id } = req.params;
    if (!id)
      return res
        .status(400)
        .send({ status: "error", message: "You must send a product id" });

    const response = await productService.deleteProductOrderList(id);
    if (!response)
      return res.status(404).send({
        status: "error",
        message: "Error deleting product from order list",
      });

    res.send({
      status: "success",
      message: "Delete product from Order List successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
