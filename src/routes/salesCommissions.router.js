import { Router } from "express";
import * as salesCommissionsController from "../controllers/salesCommissions.controller.js";
import { authorization } from "../utils.js";

const router = Router();

router.get("/", authorization("premium"), salesCommissionsController.getSales);
router.get(
  "/:id",
  authorization("premium"),
  salesCommissionsController.getSale
);

router.post(
  "/apply-invoices",
  authorization("premium"),
  salesCommissionsController.applyInvoices
);

router.patch(
  "/",
  authorization("premium"),
  salesCommissionsController.updateSale
);

export default router;
