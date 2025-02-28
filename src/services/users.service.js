import { CONSTANTS } from "../config/constants/constansts.js";
import User from "../dao/mongoManagers/Users.js";
import UsersRepository from "../repository/Users.repository.js";

const userManager = new User();
const usersRepository = new UsersRepository(userManager);

export const getUser = async (uid) => await usersRepository.getUser(uid);

export const getUsers = async () => await usersRepository.getUsers();

export const getByCode = async (code_technical) =>
  await usersRepository.getByCode(code_technical);

export const register = async (user) => await usersRepository.register(user);

export const getByEmail = async (email) =>
  await usersRepository.getByEmail(email);

export const login = async (user) => await usersRepository.login(user);

export const update = async (user, userUpdate) => {
  if (userUpdate.role === CONSTANTS.ADMIN) userUpdate.role === user.role;
  userUpdate = { ...user, ...userUpdate };
  return await usersRepository.update(user._id, userUpdate);
};

export const remove = async (id) => await usersRepository.delete(id);
