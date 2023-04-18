import {
  getInProcess as getInProcessService,
  getPendings as getPendingsService,
  getFinalDisposition as getFinalDispositionService,
  getInProgressByTechnical as getInProgressByTechnicalService,
  getToDeliver as getToDeliverService,
  getOrder as getOrderService,
  take as takeService,
  update as updateService,
  close as closeService,
  free as freeService,
} from "../services/orders.service.js";

const getInProcess = async (req, res) => {
  try {
    const orders = await getInProcessService();

    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getToDeliver = async (req, res) => {
  try {
    const orders = await getToDeliverService();

    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getFinalDisposition = async (req, res) => {
  try {
    const orders = await getFinalDispositionService();

    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getPendings = async (req, res) => {
  try {
    const { sector } = req.params;
    const orders = await getPendingsService(sector);

    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getInProgressByTechnical = async (req, res) => {
  try {
    const { code_technical } = req.params;
    const orders = await getInProgressByTechnicalService(code_technical);

    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const { nrocompro } = req.params;
    const order = await getOrderService(nrocompro);
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const take = async (req, res) => {
  try {
    const { nrocompro, code_technical } = req.body;

    const result = await takeService(nrocompro, code_technical);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { nrocompro, diagnostico, costo, code_technical } = req.body;

    const result = await updateService(
      nrocompro,
      diagnostico,
      costo,
      code_technical
    );

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const close = async (req, res) => {
  try {
    const { nrocompro, diagnostico, costo, code_technical, diag } = req.body;

    const result = await closeService(
      nrocompro,
      diagnostico,
      costo,
      code_technical,
      diag
    );

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const free = async (req, res) => {
  try {
    const { nrocompro } = req.body;

    const result = await freeService(nrocompro);
    if (result?.status === "error")
      return res.status(400).send({ status: "error", message: result.message });

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

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
