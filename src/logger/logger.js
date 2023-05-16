import winston from "winston";
import config from "../config/config.js";
import { __dirname } from "../utils.js";

const ENVIRONMENT = config.env;
const loggerPath = `${__dirname}/logger/logs`;

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "red",
    warning: "yellow",
    info: "green",
    debug: "blue",
  },
};

let logger;

if (ENVIRONMENT === "production") {
  logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "error",
        format: winston.format.combine(
          winston.format.colorize({
            all: true,
            colors: customLevelOptions.colors,
          }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: `${loggerPath}/prod.log`,
        level: "error",
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({
            all: true,
            colors: customLevelOptions.colors,
          }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: `${loggerPath}/dev.log`,
        level: "debug",
      }),
    ],
  });
}

export default logger;
