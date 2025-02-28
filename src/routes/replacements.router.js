import { Router } from "express";
import { authorization } from "../utils.js";

const router = Router();
import * as replacementsController from "../controllers/replacements.controller.js";
import { upload } from "../multer/storage.js";
import { CONSTANTS } from "../config/constants/constansts.js";

router.get(
  "/:id",

  replacementsController.getReplacementById
);
router.get(
  "/service-work/:code",

  replacementsController.getReplacementByOrderNumber
);

router.get(
  "/",

  replacementsController.getReplacements
);

router.post("/", replacementsController.create);

router.post(
  "/images/:rid",
  upload.array("imagesReplacement", 5),
  replacementsController.uploadImages
);

router.put(
  "/archived/:id",
  authorization(CONSTANTS.PREMIUM),
  replacementsController.archived
);
router.put(
  "/:id",
  authorization(CONSTANTS.PREMIUM, CONSTANTS.TECHNICAL),
  replacementsController.update
);

router.delete(
  "/:id",
  authorization(CONSTANTS.PREMIUM),
  replacementsController.remove
);

export default router;
