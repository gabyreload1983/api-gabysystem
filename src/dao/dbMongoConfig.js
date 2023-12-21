import mongoose from "mongoose";
import logger from "../logger/logger.js";

const URI = process.env.MONGO_URL;

try {
  await mongoose.connect(URI);
  logger.info("Connect to mongo");
} catch (error) {
  logger.error("Can not connect to mongoDB", error);
  process.exit(1);
}
