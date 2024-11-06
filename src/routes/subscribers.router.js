import { Router } from "express";
import { authorization } from "../utils.js";

const router = Router();
import * as subscribersController from "../controllers/subscribers.controller.js";

router.get("/:code", subscribersController.getSubscriberByCode);
router.get("/", subscribersController.getSubscribers);

router.post("/", authorization("premium"), subscribersController.create);

router.put(
  "/remove-subscription",
  authorization("premium"),
  subscribersController.removeSubscription
);

router.put(
  "/add-equipment",
  authorization("premium", "technical"),
  subscribersController.addEquipment
);

router.put(
  "/remove-equipment",
  authorization("premium", "technical"),
  subscribersController.removeEquipment
);

router.put(
  "/:code",
  authorization("premium", "technical"),
  subscribersController.updateSubscriber
);

export default router;
