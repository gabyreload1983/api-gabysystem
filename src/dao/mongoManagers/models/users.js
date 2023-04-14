import mongoose from "mongoose";

const userCollection = "users";

const usersSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  code_technical: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model(userCollection, usersSchema);

export default userModel;
