import User from "../dao/mongoManagers/users.js";

const userManager = new User();

const getUsers = async () => await userManager.getAll();

const getUserByCode = async (code_technical) =>
  await userManager.getByCodeTechnical(code_technical.toUpperCase());

const getByEmail = async (email) => await userManager.getByEmail(email);

const createUser = async (user) => await userManager.create(user);

export { getUsers, getUserByCode, getByEmail, createUser };
