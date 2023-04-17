import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateToken = (user) =>
  jwt.sign({ user }, config.private_key_jwt, { expiresIn: "7 days" });

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const validatePassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const authorization = (role) => {
  return async (req, res, next) => {
    console.log("authorization", req.user);
    if (req.user.role !== role)
      return res.status(403).send({ error: "Not permissions" });
    next();
  };
};
