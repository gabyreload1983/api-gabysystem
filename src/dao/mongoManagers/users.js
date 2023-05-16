import logger from "../../logger/logger.js";
import userModel from "./models/users.js";

export default class Users {
  constructor() {
    logger.info("Working Users with DB in mongoDB");
  }

  create = async (user) => await userModel.create(user);

  getAll = async () => await userModel.find();

  getByEmail = async (email) => await userModel.findOne({ email });

  getByCodeTechnical = async (code_technical) =>
    await userModel.findOne({ code_technical });

  getById = async (id) => await userModel.findOne({ _id: id });

  update = async (uid, user) => await userModel.updateOne({ _id: uid }, user);

  delete = async (uid) => await userModel.deleteOne({ _id: uid });
}
