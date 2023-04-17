import { Router } from "express";

const router = Router();
import {
  getUsers,
  getUserByCode,
  createUser,
  loginUser,
} from "../../controllers/users.controller.js";
import passport from "passport";
import { authorization } from "../../utils.js";

router.get("/", getUsers);
router.get("/code/:code_technical", getUserByCode);

router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  createUser
);
router.post("/login", loginUser);

export default router;
