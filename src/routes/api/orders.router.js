import { Router } from "express";

const router = Router();
import {
  getPendings,
  getInProcess,
  getInProgressByTechnical,
  getOrder,
} from "../../controllers/orders.controller.js";

router.get("/in-process", getInProcess);
router.get("/pending/:sector", getPendings);
router.get("/technical/:code_technical", getInProgressByTechnical);
router.get("/:nrocompro", getOrder);

export default router;
