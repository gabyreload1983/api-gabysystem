import logger from "../logger/logger.js";
import * as ordersService from "../services/orders.service.js";
import * as customersServices from "../services/customers.service.js";

import { incompleteValues, isValidOrder } from "../validators/validator.js";

export const getOrders = async (req, res) => {
  try {
    const { from, to } = req.params;
    if (!from || !to)
      return res
        .status(400)
        .send({ status: "error", message: "You must send from and to dates" });

    const orders = await ordersService.getOrders(from, to);
    if (!orders)
      return res
        .status(400)
        .send({ status: "error", message: "Error getting orders" });

    res.send({ status: "success", message: "OK", payload: orders });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
export const getInProcess = async (req, res) => {
  try {
    const orders = await ordersService.getInProcess();
    if (!orders)
      return res
        .status(400)
        .send({ status: "error", message: "Error orders in process" });

    res.send({ status: "success", message: "OK", payload: orders });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getToDeliver = async (req, res) => {
  try {
    const orders = await ordersService.getToDeliver();
    if (!orders)
      return res
        .status(400)
        .send({ status: "error", message: "Error orders to deliver" });

    res.send({ status: "success", message: "OK", payload: orders });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getFinalDisposition = async (req, res) => {
  try {
    const orders = await ordersService.getFinalDisposition();
    if (!orders)
      return res
        .status(400)
        .send({ status: "error", message: "Error orders final disposition" });

    res.send({ status: "success", message: "OK", payload: orders });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getProcessSector = async (req, res) => {
  try {
    const { sector } = req.params;
    const orders = await ordersService.getProcessSector(sector);
    if (!orders)
      return res
        .status(400)
        .send({ status: "error", message: "Error orders process" });

    res.send({ status: "success", message: "OK", payload: orders });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getPendings = async (req, res) => {
  try {
    const { sector } = req.params;
    const orders = await ordersService.getPendings(sector);
    if (!orders)
      return res
        .status(400)
        .send({ status: "error", message: "Error orders pending" });

    res.send({ status: "success", message: "OK", payload: orders });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getPendingsAll = async (req, res) => {
  try {
    const orders = await ordersService.getPendingsAll();
    if (!orders)
      return res
        .status(400)
        .send({ status: "error", message: "Error orders pendingAll" });

    res.send({ status: "success", message: "OK", payload: orders });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getInProgressByTechnical = async (req, res) => {
  try {
    const { code_technical } = req.params;
    const orders = await ordersService.getInProgressByTechnical(code_technical);
    if (!orders)
      return res
        .status(400)
        .send({ status: "error", message: "Error orders process tecnical" });

    res.send({ status: "success", message: "OK", payload: orders });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getOrder = async (req, res) => {
  try {
    const { nrocompro } = req.params;
    if (incompleteValues(nrocompro))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(400)
        .send({ status: "error", message: "No se encontro orden" });

    res.send({ status: "success", message: "OK", payload: order });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getStatistics = async (req, res) => {
  try {
    const { from, to } = req.params;
    if (incompleteValues(from, to))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const statistics = await ordersService.getStatistics(from, to);

    res.send({
      status: "success",
      message: "OK",
      payload: statistics,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getOrdersByCustomer = async (req, res) => {
  try {
    const { code } = req.params;
    if (incompleteValues(code))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const orders = await ordersService.getOrdersByCustomer(code);

    res.send({
      status: "success",
      message: "OK",
      payload: orders,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const take = async (req, res) => {
  try {
    const { nrocompro, code_technical, notification } = req.body;
    if (incompleteValues(nrocompro, code_technical))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(400)
        .send({ status: "error", message: "No se encontro orden" });

    const result = await ordersService.take(
      order,
      code_technical,
      notification
    );
    if (!result)
      return res.status(400).send({ status: "error", message: "Error taking" });

    res.send({ status: "success", message: "Order Taked", payload: result });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const updateDiagnosis = async (req, res) => {
  try {
    const { diagnosis, nrocompro } = req.body;
    const { user } = req;

    if (!diagnosis || !nrocompro) {
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });
    }

    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(404)
        .send({ status: "error", message: "Order not found" });

    const result = await ordersService.updateDiagnosis({
      nrocompro,
      diagnosis,
      user,
    });
    if (!result)
      return res
        .status(400)
        .send({ status: "error", message: "Error updating" });

    res.send({ status: "success", message: "Order Updated", payload: result });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const close = async (req, res) => {
  try {
    const {
      nrocompro,
      diagnostico,
      costo,
      code_technical,
      diag,
      notification = false,
    } = req.body;
    if (incompleteValues(nrocompro, diagnostico, costo, code_technical, diag))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(404)
        .send({ status: "error", message: "Order not found" });

    const result = await ordersService.close(
      nrocompro,
      diagnostico,
      costo,
      code_technical,
      diag,
      notification
    );
    if (!result)
      return res
        .status(400)
        .send({ status: "error", message: "Error closing" });

    res.send({ status: "success", message: "Order Close", payload: result });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const free = async (req, res) => {
  try {
    const { nrocompro, code_technical } = req.body;
    if (incompleteValues(nrocompro, code_technical))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(400)
        .send({ status: "error", message: "No se encontro orden" });

    if (order.ubicacion === 22)
      return { status: "error", message: "La orden ya fue entregada!" };

    const result = await ordersService.free(nrocompro);
    if (!result)
      return res.status(400).send({ status: "error", message: "Error free" });

    res.send({ status: "success", message: "Order free", payload: result });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const out = async (req, res) => {
  try {
    const { nrocompro } = req.params;
    const { notification } = req.body;
    const { user } = req;

    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(404)
        .send({ status: "error", message: "Order not found" });

    if (order.estado !== 23)
      return res
        .status(404)
        .send({ status: "error", message: "The order is not finished" });
    if (order.ubicacion === 22)
      return res.status(404).send({
        status: "error",
        message: "The order has already been delivered",
      });

    const result = await ordersService.out(order, notification, user);
    if (!result)
      return res.status(400).send({
        status: "error",
        message: "Error trying to output the order",
      });

    res.send({ status: "success", message: "Order Out", payload: result });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const handleProductsInOrder = async (req, res) => {
  try {
    const order = req.body;
    const orderExists = await ordersService.getOrder(order.nrocompro);
    if (!orderExists)
      return res
        .status(404)
        .send({ status: "error", message: "Order not found" });

    const result = await ordersService.handleProductsInOrder(order, req.user);
    if (!result)
      return res.status(400).send({
        status: "error",
        message: "Error trying update products in order",
      });

    res.send({
      status: "success",
      message: "Products in order updates successfully",
      payload: result,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { nrocompro, customerId } = req.body;

    const customer = await customersServices.getByCode(customerId);
    if (!customer)
      return res
        .status(404)
        .send({ status: "error", message: "Customer not found" });

    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(404)
        .send({ status: "error", message: "Order not found" });

    const result = await ordersService.updateCustomer(nrocompro, customer);
    if (!result)
      return res.status(400).send({
        status: "error",
        message: "Error trying update customer in order",
      });

    res.send({
      status: "success",
      message: "Customer updates successfully",
      payload: result,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const create = async (req, res) => {
  try {
    const { order } = req.body;
    if (!order || !isValidOrder(order)) {
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });
    }

    order.seller = req.user.code_technical;
    const result = await ordersService.create({ order, user: req.user });

    if (!result)
      return res
        .status(400)
        .send({ status: "error", message: "Error creating order" });

    res.send({
      status: "success",
      message: "Order created successfully",
      payload: result,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { nrocompro } = req.params;
    const newOrder = req.body.order;

    if (!newOrder) {
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });
    }

    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(404)
        .send({ status: "error", message: "Order not found" });

    const result = await ordersService.updateOrder({ newOrder, order });

    if (!result)
      return res
        .status(404)
        .send({ status: "error", message: "Error Order update" });

    res.send({
      status: "success",
      message: "Order updated successfully",
      payload: result,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const createPdf = async (req, res) => {
  try {
    const { user } = req;
    const { nrocompro, customer } = req.body;
    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(404)
        .send({ status: "error", message: "No se encontro orden" });

    const response = await ordersService.createPdf({ order, user, customer });
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error creating pdf" });

    res.send({
      status: "success",
      message: "PDF ok",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const sendCustomerPdf = async (req, res) => {
  try {
    const { user } = req;
    const { nrocompro } = req.body;
    const order = await ordersService.getOrder(nrocompro);
    if (!order)
      return res
        .status(404)
        .send({ status: "error", message: "Order not found" });

    const response = await ordersService.sendCustomerPdf({
      order,
      user,
    });
    if (!response)
      return res.status(400).send({
        status: "error",
        message: "Error sending pdf by whatsapp. Check phone number",
      });

    res.send({
      status: "success",
      message: "PDF sending successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
