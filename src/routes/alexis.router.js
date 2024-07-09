import { Router } from "express";
import * as alexisAccountController from "../controllers/alexisAccount.controller.js";
import * as salesCommissionsController from "../controllers/salesCommissions.controller.js";
import { authorization } from "../utils.js";

const router = Router();

// ACCOUNT ROUTE
router.get(
  "/account",
  authorization("premium"),
  alexisAccountController.getAll
);

router.get(
  "/account/:id",
  authorization("premium"),
  alexisAccountController.findById
);

router.delete(
  "/account/:id",
  authorization("premium"),
  alexisAccountController.remove
);

//  PAYMENT

router.post(
  "/payment",
  authorization("premium"),
  alexisAccountController.create
);

// SALES ROUTE

router.get(
  "/sales",
  authorization("premium"),
  salesCommissionsController.getSales
);
router.get(
  "/sales/:id",
  authorization("premium"),
  salesCommissionsController.getSale
);

router.post(
  "/sales/refresh",
  authorization("premium"),
  salesCommissionsController.refresh
);

router.patch(
  "/sales",
  authorization("premium"),
  salesCommissionsController.updateSale
);

export default router;
