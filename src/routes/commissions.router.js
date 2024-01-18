import { Router } from "express";
import * as commissionsController from "../controllers/commissions.controller.js";
import { authorization } from "../utils.js";

const router = Router();

router.get("/", authorization("premium"), commissionsController.getAll);

router.post("/", authorization("premium"), commissionsController.create);

export default router;
