import User from "../dao/mongoManagers/users.js";
import UsersRepository from "../repository/users.repository.js";

const userManager = new User();
const usersRepository = new UsersRepository(userManager);

export const getUsers = async () => await usersRepository.getUsers();

export const getUserByCode = async (code_technical) =>
  await usersRepository.getByCodeTechnical(code_technical.toUpperCase());

export const getByEmail = async (email) =>
  await usersRepository.getByEmail(email);

export const createUser = async (user) => await usersRepository.create(user);

export const login = async (user) => await usersRepository.login(user);

export const updateUser = async (uid, user) =>
  await usersRepository.update(uid, user);
