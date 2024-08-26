import mongoose from "mongoose";

const subscribersCollection = "subscribers";

const subscribersSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    cuit: {
      type: String,
    },
    balance: {
      type: String,
    },
    condition: {
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    email: {
      type: String,
    },
    list: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    equipments: {
      type: [
        {
          mac: {
            type: String,
            required: true,
          },
          name: String,
          observation: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const subscribersModel = mongoose.model(
  subscribersCollection,
  subscribersSchema
);

export default subscribersModel;
