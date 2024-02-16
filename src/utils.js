import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "./logger/logger.js";

const PRIVATE_KEY_JWT = process.env.PRIVATE_KEY_JWT;

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateToken = (user) =>
  jwt.sign({ user }, PRIVATE_KEY_JWT, { expiresIn: "30d" });

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.error(`Not authenticated. ${req.socket?.remoteAddress}`);
    return res.status(401).send({ error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY_JWT, (error, credentials) => {
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

export const getNextNrocompro = (lastNrocompro) => {
  const ORDER_POSITION = process.env.ORDER_POSITION;
  const number = parseInt(
    lastNrocompro.replace(`ORX00${ORDER_POSITION}`, ""),
    10
  );
  const nextNumber = +number + 1;
  const zeros = "00000000".slice(number.toString().length);
  const nextNrocompro = `ORX00${ORDER_POSITION}${zeros}${nextNumber}`;
  return nextNrocompro;
};

export const getIvaCondition = (type) => {
  if (type === "E") return "EXENTO";
  if (type === "I") return "RESPONSABLE INSCRIPTO";
  return "";
};

export const getIvaPercentage = (iva) => {
  if (iva === "1") return 21;
  if (iva === "3") return 10.5;
  return "";
};

export const getCodeInvoice = (type) => {
  if (type === "A") return "001";
  if (type === "B") return "006";
};

export const getSalerName = (name) => {
  const SALERS = [
    { code: "clau", name: "claudio" },
    { code: "mau", name: "mauro" },
    { code: "mati", name: "matias" },
    { code: "leo", name: "leonardo" },
    { code: "gaby", name: "gabriel" },
  ];
  const index = SALERS.findIndex((saler) => saler.code === name.toLowerCase());
  return SALERS[index].name;
};

export const trueStringToBoolean = (str) => /true/i.test(str);
