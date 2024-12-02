import { Router } from "express";
import { authorization } from "../utils.js";

const router = Router();
import * as subscribersController from "../controllers/subscribers.controller.js";

router.get("/:code", subscribersController.getSubscriberByCode);
router.get("/", subscribersController.getSubscribers);

router.post(
  "/send-invoice-subscribers",
  authorization("premium"),
  subscribersController.sendInvoiceSubscribers
);

router.post("/", authorization("premium"), subscribersController.create);

router.put(
  "/remove-subscription",
  authorization("premium"),
  subscribersController.removeSubscription
);

router.put(
  "/add-equipment",
  authorization("premium"),
  subscribersController.addEquipment
);

router.put(
  "/remove-equipment",
  authorization("premium"),
  subscribersController.removeEquipment
);

router.put(
  "/update-equipment",
  authorization("premium"),
  subscribersController.updateEquipment
);

router.put(
  "/:code",
  authorization("premium"),
  subscribersController.updateSubscriber
);

export default router;
