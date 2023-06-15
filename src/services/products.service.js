import Products from "../dao/sqlManager/Products.js";
import ProductsRepository from "../repository/Products.repository.js";

const productManager = new Products();
const productsRepository = new ProductsRepository(productManager);

export let searchBy = async (code, ean, description, stock) => {
  const payload = { products: [], dollar: "" };
  if (code) payload.products = await productsRepository.getByCode(code, stock);
  if (ean) payload.products = await productsRepository.getByEan(ean, stock);
  if (description)
    payload.products = await productsRepository.getByDescription(
      description,
      stock
    );

  if (payload.products.length > 0)
    payload.dollar = await productsRepository.getDollarValue();

  return payload;
};
