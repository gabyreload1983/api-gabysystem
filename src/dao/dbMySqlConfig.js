import mysql from "mysql";

export const connectionUrbano = mysql.createPool({
  connectionLimit: 100,
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  debug: false,
});
