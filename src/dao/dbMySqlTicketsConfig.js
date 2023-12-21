import mysql from "mysql";

export const connectionTickets = mysql.createPool({
  connectionLimit: 100,
  host: process.env.SQL_TICKETS_HOST,
  user: process.env.SQL_TICKETS_USER,
  password: process.env.SQL_TICKETS_PASSWORD,
  database: process.env.SQL_TICKETS_DATABASE,
  debug: false,
});
