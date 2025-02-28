import { Router } from "express";
import * as productsController from "../controllers/products.controller.js";
import { authorization } from "../utils.js";
import { CONSTANTS } from "../config/constants/constansts.js";

const router = Router();

router.get("/search-by", productsController.searchBy);

router.get("/serie/:serialNumber", productsController.searchBySerie);

router.get("/order-list", productsController.getOrderList);

router.post("/request", productsController.request);
router.post("/request/bought", productsController.bought);

router.delete(
  "/clear-order-list",
  authorization(CONSTANTS.PREMIUM),
  productsController.clearOrderList
);

router.delete(
  "/order-list/:productId",
  authorization(CONSTANTS.PREMIUM, CONSTANTS.SELLER),
  productsController.deleteProductOrderList
);

export default router;
