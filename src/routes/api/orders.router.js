import { Router } from "express";

const router = Router();
import {
  getPendings,
  getInProcess,
  getInProgressByTechnical,
  getOrder,
  take,
} from "../../controllers/orders.controller.js";

router.get("/in-process", getInProcess);
router.get("/pending/:sector", getPendings);
router.get("/technical/:code_technical", getInProgressByTechnical);
router.get("/:nrocompro", getOrder);

router.post("/take/", take);

export default router;
