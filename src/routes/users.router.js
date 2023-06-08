import { Router } from "express";

const router = Router();
import * as userController from "../controllers/users.controller.js";
import { authToken, authorization } from "../utils.js";

router.get("/", authToken, authorization("admin"), userController.getUsers);
router.get(
  "/code/:code_technical",
  authToken,
  authorization("admin"),
  userController.getUserByCode
);
router.post(
  "/register",
  authToken,
  authorization("admin"),
  userController.createUser
);

router.post("/login", userController.loginUser);

router.put(
  "/:uid",
  authToken,
  authorization("admin"),
  userController.updateUser
);

export default router;
