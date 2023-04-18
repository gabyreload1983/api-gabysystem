import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  sql_host: process.env.SQL_HOST,
  sql_user: process.env.SQL_USER,
  sql_password: process.env.SQL_PASSWORD,
  sql_database: process.env.SQL_DATABASE,
  private_key_jwt: process.env.PRIVATE_KEY_JWT,
  mail_host: process.env.MAIL_HOST,
  mail_user: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASSWORD,
  mail_from: process.env.MAIL_FROM,
  mail_bcc: process.env.MAIL_BCC,
};
