import { Router } from "express";

const router = Router();
import * as ordersController from "../controllers/orders.controller.js";
import { authorization } from "../utils.js";

router.get("/in-process", ordersController.getInProcess);
router.get("/to-deliver", ordersController.getToDeliver);
router.get("/final-disposition", ordersController.getFinalDisposition);
router.get("/pendings-all", ordersController.getPendingsAll);
router.get("/process/:sector", ordersController.getProcessSector);
router.get("/pending/:sector", ordersController.getPendings);
router.get("/all/:from/:to", ordersController.getOrders);
router.get(
  "/technical/:code_technical",
  ordersController.getInProgressByTechnical
);
router.get("/:nrocompro", ordersController.getOrder);

router.get(
  "/statitstics/:from/:to",
  authorization("premium"),
  ordersController.getStatistics
);

router.get("/customer/:code", ordersController.getOrdersByCustomer);

router.post("/", ordersController.create);

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
  ordersController.handleProductsInOrder
);

router.put(
  "/update-customer",
  authorization("premium"),
  ordersController.updateCustomer
);

export default router;
