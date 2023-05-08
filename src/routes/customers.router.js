import { Router } from "express";

const router = Router();
import { getCustomerByCode } from "../controllers/customers.controller.js";

router.get("/code/:codigo", getCustomerByCode);

export default router;
