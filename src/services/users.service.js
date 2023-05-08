import User from "../dao/mongoManagers/users.js";
import UsersDto from "./../dao/DTOs/users.dto.js";

const userManager = new User();

export const getUsers = async () => await userManager.getAll();

export const getUserByCode = async (code_technical) =>
  await userManager.getByCodeTechnical(code_technical.toUpperCase());

export const getByEmail = async (email) => await userManager.getByEmail(email);

export const createUser = async (user) => await userManager.create(user);

export const login = async (user) => new UsersDto(user);
