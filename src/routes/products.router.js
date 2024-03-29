import { Router } from "express";
import * as productsController from "../controllers/products.controller.js";
import { authorization } from "../utils.js";

const router = Router();

router.get("/search-by", productsController.searchBy);

router.get("/serie/:serialNumber", productsController.searchBySerie);

router.get(
  "/order-list",
  authorization("premium"),
  productsController.getOrderList
);

router.delete(
  "/clear-order-list",
  authorization("premium"),
  productsController.clearOrderList
);

router.delete(
  "/order-list/:productId",
  authorization("premium"),
  productsController.deleteProductOrderList
);

export default router;
