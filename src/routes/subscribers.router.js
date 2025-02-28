import { Router } from "express";
import { authorization } from "../utils.js";

const router = Router();
import * as subscribersController from "../controllers/subscribers.controller.js";
import { CONSTANTS } from "../config/constants/constansts.js";

router.get("/:code", subscribersController.getSubscriberByCode);
router.get("/", subscribersController.getSubscribers);

router.post(
  "/",
  authorization(CONSTANTS.PREMIUM),
  subscribersController.create
);

router.put(
  "/remove-subscription",
  authorization(CONSTANTS.PREMIUM),
  subscribersController.removeSubscription
);

router.put(
  "/add-equipment",
  authorization(CONSTANTS.PREMIUM),
  subscribersController.addEquipment
);

router.put(
  "/remove-equipment",
  authorization(CONSTANTS.PREMIUM),
  subscribersController.removeEquipment
);

router.put(
  "/update-equipment",
  authorization(CONSTANTS.PREMIUM),
  subscribersController.updateEquipment
);

router.put(
  "/:code",
  authorization(CONSTANTS.PREMIUM),
  subscribersController.updateSubscriber
);

export default router;
