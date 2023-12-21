import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;
import { __dirname } from "../utils.js";

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
    error: "magenta",
    warning: "yellow",
    info: "green",
    debug: "blue",
  },
};

const customTimestamp = { format: "DD-MM-YYYY T hh:mm:ss A" };

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toLocaleUpperCase()}: ${message}`;
});

const ENVIRONMENT = process.env.NODE_ENV;
const loggerPath = `${__dirname}/logger/logs`;

let logger;

if (ENVIRONMENT === "production") {
  logger = createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new transports.Console({
        level: "error",
        format: combine(
          timestamp(customTimestamp),
          customFormat,
          colorize({
            all: true,
            colors: customLevelOptions.colors,
          })
        ),
      }),
      new transports.File({
        filename: `${loggerPath}/prod.log`,
        level: "error",
        format: combine(timestamp(customTimestamp), customFormat),
      }),
    ],
  });
} else {
  logger = createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new transports.Console({
        level: "debug",
        format: combine(
          timestamp(customTimestamp),
          customFormat,
          colorize({
            all: true,
            colors: customLevelOptions.colors,
          })
        ),
      }),
      new transports.File({
        filename: `${loggerPath}/dev.log`,
        level: "debug",
        format: combine(timestamp(customTimestamp), customFormat),
      }),
    ],
  });
}

export default logger;
