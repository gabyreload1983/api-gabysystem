import logger from "../../logger/logger.js";
import { connectionUrbano } from "../dbMySqlConfig.js";
import { connectionTickets } from "../dbMySqlTicketsConfig.js";

export const sendQueryUrbano = (query, values = []) => {
  return new Promise((resolve, reject) => {
    logger.debug(`QUERY: ${query}`);
    logger.debug(`VALUES: ${values}`);
    connectionUrbano.query(query, values, (error, result) => {
      if (error) {
        logger.error(error);
        reject(new Error(error.message));
      } else {
        resolve(result);
      }
    });
  });
};

export const sendQueryTickets = (query, values = []) => {
  return new Promise((resolve, reject) => {
    logger.debug(`QUERY: ${query}`);
    logger.debug(`VALUES: ${values}`);
    connectionTickets.query(query, values, (error, result) => {
      if (error) {
        logger.error(error);
        reject(new Error(error.message));
      } else {
        resolve(result);
      }
    });
  });
};
