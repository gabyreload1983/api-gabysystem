import { Router } from "express";

const router = Router();
import * as ordersController from "../controllers/orders.controller.js";
import { authorization } from "../utils.js";
import { CONSTANTS } from "../config/constants/constansts.js";

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
  authorization(CONSTANTS.PREMIUM),
  ordersController.getStatistics
);

router.get("/customer/:code", ordersController.getOrdersByCustomer);

router.post("/pdf", ordersController.createPdf);

router.post(
  "/send/customer-pdf",
  authorization(CONSTANTS.SELLER, CONSTANTS.PREMIUM),
  ordersController.sendCustomerPdf
);

router.post(
  "/",
  authorization(CONSTANTS.SELLER, CONSTANTS.PREMIUM),
  ordersController.create
);

router.patch(
  "/:nrocompro",
  authorization(CONSTANTS.SELLER, CONSTANTS.PREMIUM),
  ordersController.updateOrder
);

router.put(
  "/take",
  authorization(CONSTANTS.TECHNICAL, CONSTANTS.PREMIUM),
  ordersController.take
);
router.put(
  "/update",
  authorization(CONSTANTS.TECHNICAL, CONSTANTS.PREMIUM),
  ordersController.updateDiagnosis
);
router.put(
  "/close",
  authorization(CONSTANTS.TECHNICAL, CONSTANTS.PREMIUM),
  ordersController.close
);
router.put(
  "/free",
  authorization(CONSTANTS.TECHNICAL, CONSTANTS.PREMIUM),
  ordersController.free
);

router.put(
  "/out/:nrocompro",
  authorization(CONSTANTS.SELLER, CONSTANTS.PREMIUM),
  ordersController.out
);

router.put(
  "/products",
  authorization(CONSTANTS.SELLER, CONSTANTS.PREMIUM),
  ordersController.handleProductsInOrder
);

router.put(
  "/update-customer",
  authorization(CONSTANTS.SELLER, CONSTANTS.PREMIUM),
  ordersController.updateCustomer
);

export default router;
