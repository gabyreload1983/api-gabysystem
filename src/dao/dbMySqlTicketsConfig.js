import mysql from "mysql";
import config from "../config/config.js";

export const connectionTickets = mysql.createPool({
  connectionLimit: 100,
  host: config.sql_tickets_host,
  user: config.sql_tickets_user,
  password: config.sql_tickets_password,
  database: config.sql_tickets_database,
  debug: false,
});
