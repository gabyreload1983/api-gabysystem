import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config/config.js";
import logger from "./logger/logger.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateToken = (user) =>
  jwt.sign({ user }, config.private_key_jwt, { expiresIn: "7 days" });

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.error(`Not authenticated. ${req.socket?.remoteAddress}`);
    return res.status(401).send({ error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.private_key_jwt, (error, credentials) => {
    if (error) return res.status(403).send({ error: "Not authorized" });
    req.user = credentials.user;
    next();
  });
};

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const validatePassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const authorization = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.error(`You don't have permissions. ${req.socket?.remoteAddress}`);
      return res
        .status(403)
        .send({ status: "error", message: "You don't have permissions" });
    }
    next();
  };
};
