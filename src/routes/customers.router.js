import { Router } from "express";

const router = Router();
import {
  getCustomerByCode,
  getCustomersByName,
} from "../controllers/customers.controller.js";
import { authorization } from "../utils.js";

router.get("/code/:codigo", authorization("admin"), getCustomerByCode);

router.get("/:name", authorization("admin"), getCustomersByName);

export default router;
