import { Router } from "express";

const router = Router();
import {
  getUsers,
  getUserByCode,
  createUser,
  loginUser,
} from "../../controllers/users.controller.js";

router.get("/", getUsers);
router.get("/code/:code_technical", getUserByCode);

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
