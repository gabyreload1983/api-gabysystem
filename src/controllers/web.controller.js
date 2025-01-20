import logger from "../logger/logger.js";
import * as webService from "../services/web.service.js";

export const onlineSalesNotification = async (req, res) => {
  try {
    const { notification } = req.body;

    const response = await webService.onlineSalesNotification(notification);
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Cant send whatsapp" });

    res.send({
      status: "success",
      message: "OK",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
