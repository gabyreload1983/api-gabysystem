import logger from "../../logger/logger.js";
import { sendQueryTickets } from "./sqlUtils.js";

export default class Tickets {
  constructor() {
    logger.info("Working Tickets with DB in MySQL");
  }

  getUsers = async () => await sendQueryTickets(`SELECT * FROM ost_staff`);
}
