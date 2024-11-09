import logger from "../logger/logger.js";
import * as subscribersService from "../services/subscribers.service.js";
import * as customersService from "../services/customers.service.js";

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
    const { code } = req.body;

    if (!code)
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values!" });

    const customer = await customersService.getByCode(code);
    if (!customer)
      return res
        .status(404)
        .send({ status: "error", message: "Customer not found" });

    const response = await subscribersService.create({ customer });

    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error creating subscriber" });

    res.send({
      status: "success",
      message: "Subscriber created",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const removeSubscription = async (req, res) => {
  try {
    const { code } = req.body;

    const subscriber = await subscribersService.getSubscriberByCode(code);
    if (!subscriber)
      return res
        .status(404)
        .send({ status: "error", message: "Subscriber not found" });

    const response = await subscribersService.removeSubscription(subscriber);
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error deleting Subscription" });

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

export const updateSubscriber = async (req, res) => {
  try {
    const { code } = req.params;
    const { subscriberUpdate } = req.body;

    const subscriber = await subscribersService.getSubscriberByCode(code);
    if (!subscriber)
      return res
        .status(404)
        .send({ status: "error", message: "Subscriber not found" });

    const response = await subscribersService.update(
      subscriber._id,
      subscriberUpdate
    );
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error updating Subscriber" });

    res.send({
      status: "success",
      message: "Subscriber update successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const addEquipment = async (req, res) => {
  try {
    const { code, newEquipment } = req.body;

    const subscriber = await subscribersService.getSubscriberByCode(code);
    if (!subscriber)
      return res
        .status(404)
        .send({ status: "error", message: "Subscriber not found" });

    const subscribers = await subscribersService.getSubscribers();

    for (const subs of subscribers) {
      const index = subs.equipments.findIndex(
        (equipment) => equipment.uuid === newEquipment.uuid.toUpperCase()
      );
      if (index !== -1)
        return res
          .status(400)
          .send({ status: "error", message: "UUID already exists" });
    }
    const response = await subscribersService.addEquipment(
      subscriber,
      newEquipment
    );

    if (response === false)
      return res
        .status(400)
        .send({ status: "error", message: "UUID already exists" });

    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error adding equipment" });

    res.send({
      status: "success",
      message: "Adding equipment successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const removeEquipment = async (req, res) => {
  try {
    const { equipmentToRemove } = req.body;

    const data = await subscribersService.getEquipmentById(
      equipmentToRemove._id
    );

    if (!data)
      return res
        .status(404)
        .send({ status: "error", message: "Equipment not found" });

    const response = await subscribersService.removeEquipmentById(
      equipmentToRemove._id
    );
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error removing equipment" });

    res.send({
      status: "success",
      message: "Removing equipment successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const { updatedEquipment } = req.body;

    const dataById = await subscribersService.getEquipmentById(
      updatedEquipment._id
    );

    if (!dataById)
      return res
        .status(404)
        .send({ status: "error", message: "Equipment not found" });

    const dataByUUID = await subscribersService.getEquipmentByUUID(
      updatedEquipment.uuid
    );

    if (dataByUUID && dataByUUID?.uuid !== dataById?.uuid)
      return res
        .status(400)
        .send({ status: "error", message: "UUID already exists" });

    const response = await subscribersService.updateEquipmentById(
      updatedEquipment._id,
      updatedEquipment
    );

    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error updating equipment" });

    res.send({
      status: "success",
      message: "Updating equipment successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
