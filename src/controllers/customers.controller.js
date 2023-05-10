import * as customerService from "../services/customers.service.js";

export const getCustomerByCode = async (req, res) => {
  const { codigo } = req.params;
  const customer = await customerService.getByCode(codigo);
  if (customer.length === 0)
    return res
      .status(404)
      .send({ status: "error", message: "No se encontro el codigo cliente" });

  res.send(customer);
};

export const getCustomersByName = async (req, res) => {
  const { name } = req.params;
  if (name.length < 3)
    return res.status(404).send({
      status: "error",
      message: "Ingrese al menos 3 caracteres para buscar un cliente",
    });

  const customer = await customerService.getCustomersByName(name);
  if (customer.length === 0)
    return res.status(404).send({
      status: "error",
      message: "No se encontro ningun cliente con esa descripcion",
    });

  res.send(customer);
};
