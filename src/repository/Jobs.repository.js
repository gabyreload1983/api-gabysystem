export default class JobsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getJob = async (id) => await this.dao.getJob(id);

  getJobs = async () => await this.dao.getJobs();

  getByName = async (name) => await this.dao.getByName(name);

  create = async (job) => await this.dao.create(job);

  update = async (id, jobUpdated) => await this.dao.update(id, jobUpdated);

  delete = async (id) => await this.dao.delete(id);
}
