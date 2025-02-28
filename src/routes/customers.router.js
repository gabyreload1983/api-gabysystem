import { Router } from "express";

const router = Router();
import * as customersController from "../controllers/customers.controller.js";
import { authorization } from "../utils.js";
import { CONSTANTS } from "../config/constants/constansts.js";

router.get("/", customersController.getCustomers);
router.get("/code/:codigo", customersController.getCustomerByCode);
router.get("/subscribers", customersController.getSubscribers);

router.get(
  "/summaries",
  authorization(CONSTANTS.PREMIUM),
  customersController.getSummaries
);

router.get("/:name", customersController.getCustomersByName);

export default router;
