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

router.put("/take", authorization("technical", "admin"), ordersController.take);
router.put(
  "/update",
  authorization("technical", "admin"),
  ordersController.update
);
router.put(
  "/close",
  authorization("technical", "admin"),
  ordersController.close
);
router.put("/free", authorization("technical", "admin"), ordersController.free);

export default router;
