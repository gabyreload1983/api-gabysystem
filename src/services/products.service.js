import Products from "../dao/sqlManager/Products.js";
import ProductsRepository from "../repository/Products.repository.js";
import { formatProduct } from "../utils.js";

const productManager = new Products();
const productsRepository = new ProductsRepository(productManager);

export const searchBy = async (code, ean, description, stock) => {
  let products = [];
  if (code) products = await productsRepository.getByCode(code, stock);
  if (ean) products = await productsRepository.getByEan(ean, stock);
  if (description)
    products = await productsRepository.getByDescription(description, stock);

  if (products.length > 0) {
    const dollar = await productsRepository.getDollarValue();
    return products.map((product) => formatProduct(product, dollar));
  }
  return products;
};

export const searchBySerie = async (serie) =>
  await productsRepository.getBySerie(serie);

export const getOrderList = async () => await productsRepository.getOrderList();

export const clearOrderList = async () =>
  await productsRepository.clearOrderList();

export const deleteProductOrderList = async (id) =>
  await productsRepository.deleteProductOrderList(id);

export const removeReservation = async (codigo) =>
  await productsRepository.removeReservation(codigo);
