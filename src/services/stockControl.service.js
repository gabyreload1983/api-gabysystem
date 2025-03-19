import StockControl from "../dao/mongoManagers/StockControl.js";
import StockControlRepository from "../repository/StockControl.repository.js";

const stockControlManager = new StockControl();
const stockControlRepository = new StockControlRepository(stockControlManager);

export const getStockControl = async (id) =>
  await stockControlRepository.getStockControl(id);

export const getStockControlByCode = async (code) =>
  await stockControlRepository.getStockControlByCode(code);

export const getStockControls = async ({ status }) => {
  if (status)
    return await stockControlRepository.getStockControlsByStatus({ status });

  return await stockControlRepository.getStockControls();
};

export const create = async (stockControl) =>
  await stockControlRepository.create(stockControl);

export const update = async (id, stockControlUpdate) =>
  await stockControlRepository.update(id, stockControlUpdate);

export const remove = async (id) => await stockControlRepository.remove(id);
