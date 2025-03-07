import moment from "moment";
import logger from "../logger/logger.js";
import * as customerService from "../services/customers.service.js";

export const getCustomers = async (req, res) => {
  try {
    const { phone } = req.query;

    const customers = await customerService.getCustomers(phone);
    if (!customers)
      return res
        .status(404)
        .send({ status: "error", message: "Customers not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: customers,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await customerService.getSubscribers();
    if (!subscribers)
      return res
        .status(404)
        .send({ status: "error", message: "Subscribers not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: subscribers,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getCustomerByCode = async (req, res) => {
  try {
    const { codigo } = req.params;
    const customer = await customerService.getByCode(codigo);
    if (!customer)
      return res
        .status(404)
        .send({ status: "error", message: "No se encontro el codigo cliente" });

    res.send({
      status: "success",
      message: "OK",
      payload: customer,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getCustomersByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (name.length < 3)
      return res.status(404).send({
        status: "error",
        message: "Ingrese al menos 3 caracteres para buscar un cliente",
      });

    const customers = await customerService.getCustomersByName(name);
    if (customers.length === 0)
      return res.status(404).send({
        status: "error",
        message: "No se encontro ningun cliente con esa descripcion",
      });

    res.send({
      status: "success",
      message: "OK",
      payload: customers,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getSummaries = async (req, res) => {
  try {
    const start = moment();
    const summaries = await customerService.getSummaries();
    if (!summaries)
      return res.status(404).send({
        status: "error",
        message: "Error searching customers",
      });

    const delay = moment(start).diff(moment(), "seconds");
    res.send({
      status: "success",
      message: `Se demoro ${delay} segundos`,
      payload: summaries,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
