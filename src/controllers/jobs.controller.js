import logger from "../logger/logger.js";
import * as jobsService from "../services/jobs.service.js";

export const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobsService.getJob(id);
    if (!job)
      return res
        .status(404)
        .send({ status: "error", message: "Job not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: job,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await jobsService.getJobs();
    if (!jobs)
      return res
        .status(404)
        .send({ status: "error", message: "Jobs not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: jobs,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const getByName = async (req, res) => {
  try {
    let { name } = req.params;

    const job = await jobsService.getByName(name);
    if (!job)
      return res
        .status(404)
        .send({ status: "error", message: "Job not found" });

    res.send({
      status: "success",
      message: "OK",
      payload: job,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const create = async (req, res) => {
  try {
    const { name, schedule } = req.body;

    if (!name || !schedule)
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values!" });

    const job = await jobsService.getByName(name);
    if (job) {
      return res
        .status(400)
        .send({ status: "error", message: "Job name already exists" });
    }

    const newJob = {
      name,
      schedule,
    };

    const response = await jobsService.create(newJob);

    res.send({
      status: "success",
      message: "Job created",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.params;

    const job = await jobsService.getByName(name);
    if (!job)
      return res
        .status(404)
        .send({ status: "error", message: "Job not found" });

    const { jobUpdated } = req.body;

    const response = await jobsService.update(job, jobUpdated);
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error updating job" });

    res.send({
      status: "success",
      message: "Job updated successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  try {
    const { name } = req.params;

    const job = await jobsService.getByName(name);
    if (!job)
      return res
        .status(404)
        .send({ status: "error", message: "Job not found" });

    const response = await jobsService.remove(job._id);
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error deleting job" });

    res.send({
      status: "success",
      message: "Job delete successfully",
      payload: response,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
