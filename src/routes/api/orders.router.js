import { Router } from "express";

const router = Router();
import {
  getPendings,
  getInProcess,
  getInProgressByTechnical,
  getOrder,
  take,
  update,
  close,
  free,
} from "../../controllers/orders.controller.js";

router.get("/in-process", getInProcess);
router.get("/pending/:sector", getPendings);
router.get("/technical/:code_technical", getInProgressByTechnical);
router.get("/:nrocompro", getOrder);

router.post("/take/", take);
router.post("/update/", update);
router.post("/close/", close);
router.post("/free/", free);

export default router;
