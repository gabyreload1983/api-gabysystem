import logger from "../logger/logger.js";
import * as userService from "../services/users.service.js";
import { generateToken } from "../utils.js";
import { createHash, validatePassword } from "../utils.js";

export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await userService.getUser(uid);
    if (!user)
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: user,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (!users)
      return res
        .status(404)
        .send({ status: "error", message: "Users not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: users,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getByCode = async (req, res) => {
  try {
    let { code_technical } = req.params;

    const userByCode = await userService.getByCode(code_technical);
    if (!userByCode)
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });

    const user = await userService.getUser(userByCode._id);

    res.send({
      status: "success",
      message: "OK",
      payload: user,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const updateImageUrl = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl)
      return res
        .status(400)
        .send({ status: "error", message: "Must to be send an URL" });

    // update image user

    res.send({
      status: "success",
      message: "Image user updated successfully",
      payload: imageUrl,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, code_technical, password, role } =
      req.body;

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

    const codeTechnical = await userService.getByCode(code_technical);
    if (codeTechnical) {
      return res
        .status(400)
        .send({ status: "error", message: "Code technical already exists" });
    }

    const newUser = {
      first_name,
      last_name,
      email,
      code_technical,
      password,
      role,
    };

    await userService.register(newUser);

    res.send({
      status: "success",
      message: "user registered",
      payload: true,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const login = async (req, res) => {
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

    const usersLoginDto = await userService.login(user);

    const accessToken = generateToken(usersLoginDto);

    res.send({
      status: "success",
      message: "user login",
      payload: { accessToken, user: usersLoginDto },
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getUserFromJwt = async (req, res) => {
  try {
    res.send({ status: "success", payload: req.user });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const { uid } = req.params;
    const { first_name, last_name, email, code_technical, role } = req.body;

    if (!first_name || !last_name || !email || !code_technical || !role)
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values!" });

    const user = await userService.getUser(uid);
    if (!user)
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });

    const response = await userService.update(uid, {
      first_name,
      last_name,
      email,
      code_technical,
      role,
    });

    res.send({
      status: "success",
      message: "user updated",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
