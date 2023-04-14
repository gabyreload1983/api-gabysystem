import mysql from "mysql";
import config from "../config/config.js";

export const connectionUrbano = mysql.createConnection({
  host: config.sql_host,
  user: config.sql_user,
  password: config.sql_password,
  database: config.sql_database,
});
