import mongoose from "mongoose";

const userCollection = "users";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  code_technical: {
    type: String,
    unique: true,
  },
  first_name: String,
  last_name: String,
  role: {
    type: String,
    default: "user",
  },
  imageUrl: String,
});

const userModel = mongoose.model(userCollection, usersSchema);

export default userModel;
