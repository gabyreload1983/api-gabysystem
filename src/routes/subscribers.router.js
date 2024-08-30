import { Router } from "express";

const router = Router();
import * as subscribersController from "../controllers/subscribers.controller.js";

router.get("/:code", subscribersController.getSubscriberByCode);
router.get("/", subscribersController.getSubscribers);

router.post("/", subscribersController.create);

router.put("/remove-subscription", subscribersController.removeSubscription);

export default router;
