import Products from "../dao/sqlManager/Products.js";

const productManager = new Products();

export let searchBy = async (code, ean, description, stock) => {
  const payload = { products: [], dollar: "" };
  if (code) payload.products = await productManager.getByCode(code, stock);
  if (ean) payload.products = await productManager.getByEan(ean, stock);
  if (description)
    payload.products = await productManager.getByDescription(
      description,
      stock
    );

  if (payload.products.length > 0)
    payload.dollar = await productManager.getDollarValue();

  return payload;
};
