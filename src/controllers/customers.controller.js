import { getCustomerByCode as getCustomerByCodeService } from "../services/customers.service.js";

const getCustomerByCode = async (req, res) => {
  const { codigo } = req.params;
  const customer = await getCustomerByCodeService(codigo);
  if (customer.length === 0)
    return res
      .status(404)
      .send({ status: "error", message: "No se encontro el codigo cliente" });

  res.send(customer);
};

export { getCustomerByCode };
