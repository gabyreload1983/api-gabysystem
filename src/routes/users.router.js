import { Router } from "express";

const router = Router();
import {
  getUsers,
  getUserByCode,
  createUser,
  loginUser,
} from "../controllers/users.controller.js";
import { authToken, authorization } from "../utils.js";

router.get("/", authToken, authorization("admin"), getUsers);
router.get(
  "/code/:code_technical",
  authToken,
  authorization("admin"),
  getUserByCode
);
router.post("/register", authToken, authorization("admin"), createUser);

router.post("/login", loginUser);

export default router;
