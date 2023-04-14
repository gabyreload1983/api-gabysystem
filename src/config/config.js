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
};
