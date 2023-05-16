import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../logger/logger.js";

const URI = config.mongoUrl;

try {
  await mongoose.connect(URI);
  logger.info("Connect to mongo");
} catch (error) {
  logger.error("Can not connect to mongoDB", error);
  process.exit(1);
}
