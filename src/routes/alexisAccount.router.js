import { Router } from "express";
import * as alexisAccountController from "../controllers/alexisAccount.controller.js";
import { authorization } from "../utils.js";

const router = Router();

router.get(
  "/account",
  authorization("premium"),
  alexisAccountController.getAll
);

router.post(
  "/account",
  authorization("premium"),
  alexisAccountController.create
);

export default router;
