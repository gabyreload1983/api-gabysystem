import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs/promises";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "./logger/logger.js";

const PRIVATE_KEY_JWT = process.env.PRIVATE_KEY_JWT;
const PRIVATE_CUSTOM_KEY_JWT = process.env.PRIVATE_CUSTOM_KEY_JWT;

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateToken = (user) =>
  jwt.sign({ user }, PRIVATE_KEY_JWT, { expiresIn: "7d" });

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.error(`Not authenticated. ${req.socket?.remoteAddress}`);
    return res
      .status(401)
      .send({ status: "error", message: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];
  if (PRIVATE_CUSTOM_KEY_JWT === token) return next();

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

export const getNroComproString = (nrocompro) => {
  const ORDER_POSITION = process.env.ORDER_POSITION;
  const zeros = "00000000".slice(nrocompro.toString().length);

  return `ORX00${ORDER_POSITION}${zeros}${nrocompro}`;
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

//TODO getUsers from mongo
export const getSellerName = (name) => {
  const SELLERS = [
    { code: "clau", name: "claudio" },
    { code: "mau", name: "mauro" },
    { code: "mati", name: "matias" },
    { code: "leo", name: "leonardo" },
    { code: "gaby", name: "gabriel" },
  ];
  const index = SELLERS.findIndex(
    (seller) => seller.code === name.toLowerCase()
  );
  return SELLERS[index].name;
};

export const trueStringToBoolean = (str) => /true/i.test(str);

export const getPackageVersion = async () => {
  try {
    const packageJsonPath = path.join(`${__dirname}`, "..", "package.json");
    await fs.access(packageJsonPath);

    const data = await fs.readFile(packageJsonPath, "utf8");

    const packageJson = JSON.parse(data);

    return packageJson.version;
  } catch (err) {
    if (err.code === "ENOENT") {
      logger.error("package.json not found.");
    } else {
      logger.error("Error:", err);
    }
  }
};

export const decodeOrderTier = (tier) => {
  if (tier === 0) return "NORMAL";
  if (tier === 1) return "1";
  if (tier === 2) return "2";
  if (tier === 3) return "ARMADOS";
  if (tier === 4) return "TURNOS/PRIORIDADES";
  if (tier === 5) return "GARANTIA REPARACION";
  if (tier === 6) return "6";
  if (tier === 7) return "7";
  if (tier === 8) return "BOXES";
  if (tier === 9) return "ABONADOS";
  if (tier === 10) return "GARANTIA COMPRA";
};

export const getDiagnosis = (diag) => {
  if (diag === "repair") return 22;
  if (diag === "withoutrepair") return 23;
  return;
};

export const wait = async (delay) =>
  await new Promise((resolve) => setTimeout(resolve, delay));

export const validateCelphoneNumber = (number) => number.length === 10;

export const formatWhatsappNumber = (number) => `54${number}`;

export const getFinishOrderTemplate = (diag) => {
  if (diag === 22) return "orden_finalizada_costo";
  if (diag === 23) return "orden_sin_reparacion";
};

export const getFinishOrderEmailMessage = (diag) => {
  if (diag === 22)
    return "La misma se encuentra finalizada y lista para retirar.";
  if (diag === 23)
    return "La misma se encuentra finalizada, pero sin reparacion y lista para retirar.";
};

export const formatPrice = (price) => {
  let p = price.toLocaleString("en-US");
  let index = p.indexOf(".");
  return index === -1
    ? p.replaceAll(",", ".")
    : p.slice(0, index).replaceAll(",", ".");
};

export const isGreaterThan = (a, b) => a > b;

export const isNumeric = (value) => !isNaN(value);
