import Jobs from "../dao/mongoManagers/Jobs.js";
import JobsRepository from "../repository/Jobs.repository.js";

const jobsManager = new Jobs();
const jobsRepository = new JobsRepository(jobsManager);

export const getJob = async (id) => await jobsRepository.getJob(id);

export const getJobs = async () => await jobsRepository.getJobs();

export const getByName = async (name) => await jobsRepository.getByName(name);

export const create = async (job) => await jobsRepository.create(job);

export const update = async (job, jobUpdated) =>
  await jobsRepository.update(job._id, jobUpdated);

export const remove = async (id) => await jobsRepository.delete(id);
