import { Router } from "express";
import * as salesCommissionsController from "../controllers/salesCommissions.controller.js";
import { authorization } from "../utils.js";

const router = Router();

router.get("/", authorization("premium"), salesCommissionsController.getSales);

export default router;
