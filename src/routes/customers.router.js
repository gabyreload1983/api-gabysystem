import { Router } from "express";

const router = Router();
import {
  getCustomerByCode,
  getCustomersByName,
} from "../controllers/customers.controller.js";

router.get("/code/:codigo", getCustomerByCode);

router.get("/:name", getCustomersByName);

export default router;
