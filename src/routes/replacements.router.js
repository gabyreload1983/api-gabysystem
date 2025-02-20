import { Router } from "express";
import { authorization } from "../utils.js";

const router = Router();
import * as replacementsController from "../controllers/replacements.controller.js";
import { upload } from "../multer/storage.js";

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

router.post("/images", upload.array("imagesReplacement", 5), (req, res) => {
  try {
    res.json({ message: "Imágenes subidas con éxito", files: req.files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", replacementsController.update);

router.delete("/:id", replacementsController.remove);

export default router;
