import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config/config.js";
import logger from "./logger/logger.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateToken = (user) =>
  jwt.sign({ user }, config.private_key_jwt, { expiresIn: "30d" });

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.error(`Not authenticated. ${req.socket?.remoteAddress}`);
    return res.status(401).send({ error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.private_key_jwt, (error, credentials) => {
    if (error)
      return res.status(403).send({
        status: "error",
        message: "jwt-expired",
      });
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

export const formatProduct = (product, dollar) => {
  const iva = product.grabado === "1" ? 1.21 : 1.105;
  const exchange = product.moneda === "D" ? dollar : 1;
  product.priceList1WithouTax = Number(product.lista1) * exchange;
  product.priceList1WithTax = Number(product.lista1) * Number(iva) * exchange;
  return product;
};

export const getTotalOrder = (order) =>
  order.products.reduce((acc, val) => {
    return (acc += Number(val.priceList1WithTax));
  }, Number(order.costo));

export const getSaleNoteString = (saleNoteNumber, saleNotePosition) => {
  return (
    `NVX00${saleNotePosition}` +
    `00000000`.slice(saleNoteNumber.toString().length) +
    saleNoteNumber
  );
};
