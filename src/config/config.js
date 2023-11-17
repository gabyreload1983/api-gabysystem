import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") dotenv.config();

if (process.env.NODE_ENV !== "production")
  dotenv.config({ path: `${process.env.PWD}/.env.${process.env.NODE_ENV}` });

export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongoUrl: process.env.MONGO_URL,
  sql_host: process.env.SQL_HOST,
  sql_user: process.env.SQL_USER,
  sql_password: process.env.SQL_PASSWORD,
  sql_database: process.env.SQL_DATABASE,
  sql_tickets_host: process.env.SQL_TICKETS_HOST,
  sql_tickets_user: process.env.SQL_TICKETS_USER,
  sql_tickets_password: process.env.SQL_TICKETS_PASSWORD,
  sql_tickets_database: process.env.SQL_TICKETS_DATABASE,
  private_key_jwt: process.env.PRIVATE_KEY_JWT,
  mail_host: process.env.MAIL_HOST,
  mail_user: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASSWORD,
  mail_from: process.env.MAIL_FROM,
  mail_bcc: process.env.MAIL_BCC,
  api_version: process.env.API_VERSION,
  sale_note_position: process.env.SALE_NOTE_POSITION,
  order_position: process.env.ORDER_POSITION,
};
