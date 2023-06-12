import logger from "../../logger/logger.js";
import userModel from "./models/users.js";

export default class Users {
  constructor() {
    logger.info("Working Users with DB in mongoDB");
  }

  getUser = async (uid) => await userModel.findOne({ _id: uid });

  getUsers = async () => await userModel.find();

  getByCode = async (code_technical) =>
    await userModel.findOne({ code_technical });

  register = async (user) => await userModel.create(user);

  getByEmail = async (email) => await userModel.findOne({ email });

  update = async (uid, user) => await userModel.updateOne({ _id: uid }, user);

  delete = async (uid) => await userModel.deleteOne({ _id: uid });
}
