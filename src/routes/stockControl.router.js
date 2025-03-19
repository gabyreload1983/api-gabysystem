import { Router } from "express";

const router = Router();

import * as stockControlController from "../controllers/stockControl.controller.js";

router.get("/:id", stockControlController.getStockControl);
router.get("/:code", stockControlController.getStockControlByCode);
router.get("/", stockControlController.getStockControls);
router.post("/", stockControlController.create);
router.put("/:id", stockControlController.update);
router.delete("/:id", stockControlController.remove);

export default router;
