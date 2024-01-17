import { Router } from "express";
import * as commissionsBalanceController from "../controllers/commissionsBalance.controller.js";
import { authorization } from "../utils.js";

const router = Router();

router.get("/", authorization("premium"), commissionsBalanceController.getAll);

router.post("/", authorization("premium"), commissionsBalanceController.create);

export default router;
