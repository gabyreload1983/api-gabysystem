import { Router } from "express";
import * as alexisAccountController from "../controllers/alexisAccount.controller.js";
import * as salesCommissionsController from "../controllers/salesCommissions.controller.js";
import { authorization } from "../utils.js";
import { CONSTANTS } from "../config/constants/constansts.js";

const router = Router();

// ACCOUNT ROUTE
router.get(
  "/account",
  authorization(CONSTANTS.PREMIUM),
  alexisAccountController.getAll
);

router.get(
  "/account/:id",
  authorization(CONSTANTS.PREMIUM),
  alexisAccountController.findById
);

router.delete(
  "/account/:id",
  authorization(CONSTANTS.PREMIUM),
  alexisAccountController.remove
);

//  PAYMENT

router.post(
  "/payment",
  authorization(CONSTANTS.PREMIUM),
  alexisAccountController.create
);

// SALES ROUTE

router.get(
  "/sales",
  authorization(CONSTANTS.PREMIUM),
  salesCommissionsController.getSales
);
router.get(
  "/sales/:id",
  authorization(CONSTANTS.PREMIUM),
  salesCommissionsController.getSale
);

router.post(
  "/sales/refresh",
  authorization(CONSTANTS.PREMIUM),
  salesCommissionsController.refresh
);

router.patch(
  "/sales",
  authorization(CONSTANTS.PREMIUM),
  salesCommissionsController.updateSale
);

export default router;
