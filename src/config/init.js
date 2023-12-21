import UsersRepository from "../repository/Users.repository.js";
import User from "../dao/mongoManagers/Users.js";
import logger from "../logger/logger.js";

const userManager = new User();
const usersRepository = new UsersRepository(userManager);
const adminUser = {
  first_name: process.env.ADMIN_FIRST_NAME,
  last_name: process.env.ADMIN_LAST_NAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  code_technical: process.env.ADMIN_CODE_TECHNICAL,
  role: process.env.ADMIN_ROLE,
};

try {
  const exists = await usersRepository.getByEmail(process.env.ADMIN_EMAIL);
  if (!exists) await usersRepository.register(adminUser);
} catch (error) {
  logger.error(error);
}
