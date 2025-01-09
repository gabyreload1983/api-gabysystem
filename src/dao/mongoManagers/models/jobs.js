import mongoose from "mongoose";

const jobsCollection = "jobs";

const jobssSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  schedule: { type: String, required: true },
});

const jobsModel = mongoose.model(jobsCollection, jobssSchema);

export default jobsModel;
