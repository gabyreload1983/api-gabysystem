import mongoose from "mongoose";

const subscribersCollection = "subscribers";

const subscribersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  equipments: {
    type: [
      {
        mac: String,
        name: String,
      },
    ],
    default: [],
  },
});

const subscribersModel = mongoose.model(
  subscribersCollection,
  subscribersSchema
);

export default subscribersModel;
