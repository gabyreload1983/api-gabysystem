import Orders from "./../dao/sqlManager/orders.js";

const orderManager = new Orders();

const getInProcess = async () => await orderManager.getInProcess();

const getPendings = async (sector) => {
  sector = sector.toUpperCase();
  return await orderManager.getPendings(sector);
};

const getInProgressByTechnical = async (code_technical) =>
  await orderManager.getInProgressByTechnical(code_technical);

const getOrder = async (nrocompro) => await orderManager.getById(nrocompro);

const take = async (nrocompro, code_technical) =>
  await orderManager.take(nrocompro, code_technical);

export { getInProcess, getPendings, getInProgressByTechnical, getOrder, take };
