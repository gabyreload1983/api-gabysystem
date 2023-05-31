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
import { authorization } from "../utils.js";

router.get("/in-process", getInProcess);
router.get("/to-deliver", getToDeliver);
router.get("/final-disposition", getFinalDisposition);
router.get("/pending/:sector", getPendings);
router.get("/technical/:code_technical", getInProgressByTechnical);
router.get("/:nrocompro", getOrder);

router.put("/take/", authorization("technical", "admin"), take);
router.put("/update/", authorization("technical", "admin"), update);
router.put("/close/", authorization("technical", "admin"), close);
router.put("/free/", authorization("technical", "admin"), free);

export default router;
