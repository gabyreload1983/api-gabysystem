import logger from "../logger/logger.js";
import * as userService from "../services/users.service.js";
import { generateToken } from "../utils.js";
import { createHash, validatePassword } from "../utils.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
export const getUserByCode = async (req, res) => {
  try {
    let { code_technical } = req.params;

    const user = await userService.getUserByCode(code_technical);
    if (!user)
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });

    res.send(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, code_technical, password } = req.body;

    if (!first_name || !last_name || !email || !code_technical || !password)
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values!" });

    const user = await userService.getByEmail(email);
    if (user) {
      return res
        .status(400)
        .send({ status: "error", message: "User already exists" });
    }

    const codeTechnical = await userService.getUserByCode(code_technical);
    if (codeTechnical) {
      return res
        .status(400)
        .send({ status: "error", message: "Code technical already exists" });
    }

    const newUser = {
      first_name,
      last_name,
      email,
      code_technical: code_technical.toUpperCase(),
      password: createHash(password),
      role: "user",
    };

    await userService.createUser(newUser);

    res.send({ status: "success", message: "user registered" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getByEmail(email);

    if (!user) {
      return res
        .status(401)
        .send({ status: "error", message: "Invalid credentials" });
    }

    if (!validatePassword(user, password))
      return res
        .status(401)
        .send({ status: "error", message: "Invalid credentials" });

    const userDto = await userService.login(user);

    const accessToken = generateToken(userDto);

    res.send({
      status: "success",
      message: "login success",
      accessToken,
      user: userDto,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { newUser } = req.body;

    const response = await userService.updateUser(uid, newUser);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
