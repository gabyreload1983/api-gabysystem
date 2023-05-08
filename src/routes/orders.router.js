import { Router } from "express";

const router = Router();
import {
  getPendings,
  getToDeliver,
  getFinalDisposition,
  getInProcess,
  getInProgressByTechnical,
  getOrder,
  take,
  update,
  close,
  free,
} from "../controllers/orders.controller.js";

router.get("/in-process", getInProcess);
router.get("/to-deliver", getToDeliver);
router.get("/final-disposition", getFinalDisposition);
router.get("/pending/:sector", getPendings);
router.get("/technical/:code_technical", getInProgressByTechnical);
router.get("/:nrocompro", getOrder);

router.put("/take/", take);
router.put("/update/", update);
router.put("/close/", close);
router.put("/free/", free);

export default router;
