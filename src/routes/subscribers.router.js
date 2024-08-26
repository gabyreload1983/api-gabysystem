import { Router } from "express";

const router = Router();
import * as subscribersController from "../controllers/subscribers.controller.js";

router.get("/", subscribersController.getSubscribers);
router.get("/code/:codigo", subscribersController.getSubscriberByCode);

router.post("/", subscribersController.create);

export default router;
