import logger from "../../logger/logger.js";
import { connectionUrbano } from "../dbMySqlConfig.js";
import { connectionTickets } from "../dbMySqlTicketsConfig.js";

export const sendQueryUrbano = (query) => {
  return new Promise((resolve, reject) => {
    logger.debug(query);
    connectionUrbano.query(query, (error, result) => {
      if (error) {
        logger.error(error);
        reject(new Error(error.message));
      } else {
        resolve(result);
      }
    });
  });
};

export const sendQueryTickets = (query) => {
  return new Promise((resolve, reject) => {
    logger.debug(query);
    connectionTickets.query(query, (error, result) => {
      if (error) {
        logger.error(error);
        reject(new Error(error.message));
      } else {
        resolve(result);
      }
    });
  });
};
