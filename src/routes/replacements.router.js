import { Router } from "express";
import { authorization } from "../utils.js";

const router = Router();
import * as replacementsController from "../controllers/replacements.controller.js";

router.get(
  "/:id",

  replacementsController.getReplacementById
);
router.get(
  "/:code",

  replacementsController.getReplacementByOrderNumber
);
router.get(
  "/",

  replacementsController.getReplacements
);

router.post("/", replacementsController.create);

router.put("/:id", replacementsController.update);

router.delete("/:id", replacementsController.remove);

export default router;
