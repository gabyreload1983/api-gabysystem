import { Router } from "express";

const router = Router();
import * as ordersController from "../controllers/orders.controller.js";
import { authorization } from "../utils.js";

router.get("/in-process", ordersController.getInProcess);
router.get("/to-deliver", ordersController.getToDeliver);
router.get("/final-disposition", ordersController.getFinalDisposition);
router.get("/pending/:sector", ordersController.getPendings);
router.get(
  "/technical/:code_technical",
  ordersController.getInProgressByTechnical
);
router.get("/:nrocompro", ordersController.getOrder);

router.put(
  "/take",
  authorization("technical", "premium"),
  ordersController.take
);
router.put(
  "/update",
  authorization("technical", "premium"),
  ordersController.update
);
router.put(
  "/close",
  authorization("technical", "premium"),
  ordersController.close
);
router.put(
  "/free",
  authorization("technical", "premium"),
  ordersController.free
);

router.put(
  "/out/:nrocompro",
  authorization("saler", "premium"),
  ordersController.out
);

router.put(
  "/products",
  authorization("saler", "premium"),
  ordersController.products
);

export default router;
