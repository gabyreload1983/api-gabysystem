import { Router } from "express";

const router = Router();
import * as webController from "../controllers/web.controller.js";

router.post(
  "/online-sales-notification",
  webController.onlineSalesNotification
);

export default router;
