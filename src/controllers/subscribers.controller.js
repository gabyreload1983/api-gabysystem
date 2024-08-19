import logger from "../logger/logger.js";
import * as subscribersService from "../services/subscribers.service.js";

export const getSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    const subscriber = await subscribersService.getSubscriber(id);
    if (!subscriber)
      return res
        .status(404)
        .send({ status: "error", message: "Subscriber not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: subscriber,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getSubscriberByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const subscriber = await subscribersService.getSubscriberByCode(code);
    if (!subscriber)
      return res
        .status(404)
        .send({ status: "error", message: "Subscriber not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: subscriber,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await subscribersService.getSubscribers();
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

export const create = async (req, res) => {
  try {
    const { email, code, name } = req.body;

    if (!email || !code || !name)
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values!" });

    const subscriber = await subscribersService.getSubscriberByEmail(email);
    if (subscriber) {
      return res
        .status(400)
        .send({ status: "error", message: "Subscriber already exists" });
    }

    await subscribersService.create({ email, code, name });

    res.send({
      status: "success",
      message: "Subscriber created",
      payload: true,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  try {
    const { code } = req.params;

    const subscriber = await subscribersService.getSubscriberByCode(code);
    if (!subscriber)
      return res
        .status(404)
        .send({ status: "error", message: "Subscriber not found" });

    const response = await subscribersService.remove(subscriber._id);
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error deleting Subscriber" });

    res.send({
      status: "success",
      message: "Subscriber delete successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
