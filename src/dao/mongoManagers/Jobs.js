import jobsModel from "./models/jobs.js";

export default class Jobs {
  constructor() {}

  getJob = async (id) => await jobsModel.findOne({ _id: id });

  getJobs = async () => await jobsModel.find();

  getByName = async (name) => await jobsModel.findOne({ name });

  create = async (job) => await jobsModel.create(job);

  update = async (id, jobUpdated) =>
    await jobsModel.updateOne({ _id: id }, jobUpdated);

  delete = async (id) => await jobsModel.deleteOne({ _id: id });
}
