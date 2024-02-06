import { sendQueryTickets } from "./sqlUtils.js";

export default class Tickets {
  constructor() {}

  getUsers = async () => await sendQueryTickets(`SELECT * FROM ost_staff`);
}
