import Orders from "./../dao/sqlManager/orders.js";

const orderManager = new Orders();

const addingProductsInOrders = async (orders) => {
  for (let order of orders) {
    order.products = await orderManager.getProductsInOrder(order.nrocompro);
  }
  return orders;
};

const getInProcess = async () => {
  const orders = await orderManager.getInProcess();
  return await addingProductsInOrders(orders);
};

const getToDeliver = async () => {
  const orders = await orderManager.getToDeliver();
  return await addingProductsInOrders(orders);
};

const getFinalDisposition = async () => {
  const orders = await orderManager.getFinalDisposition();
  return await addingProductsInOrders(orders);
};

const getPendings = async (sector) => {
  const orders = await orderManager.getPendings(sector);
  return await addingProductsInOrders(orders);
};

const getInProgressByTechnical = async (code_technical) => {
  const orders = await orderManager.getInProgressByTechnical(
    code_technical.toUpperCase()
  );
  return await addingProductsInOrders(orders);
};

const getOrder = async (nrocompro) => {
  const order = await orderManager.getById(nrocompro);
  order[0].products = await orderManager.getProductsInOrder(nrocompro);
  return order;
};

const take = async (nrocompro, code_technical) =>
  await orderManager.take(nrocompro, code_technical);

const update = async (nrocompro, diagnostico, costo, code_technical) =>
  await orderManager.update(nrocompro, diagnostico, costo, code_technical);

const close = async (nrocompro, diagnostico, costo, code_technical, diag) =>
  await orderManager.close(nrocompro, diagnostico, costo, code_technical, diag);

const free = async (nrocompro) => await orderManager.free(nrocompro);

export {
  getInProcess,
  getToDeliver,
  getFinalDisposition,
  getPendings,
  getInProgressByTechnical,
  getOrder,
  take,
  update,
  close,
  free,
};
