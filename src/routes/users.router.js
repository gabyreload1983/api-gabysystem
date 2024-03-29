import { Router } from "express";

const router = Router();
import * as userController from "../controllers/users.controller.js";
import { authToken, authorization } from "../utils.js";

router.get("/", authToken, authorization("admin"), userController.getUsers);
router.get("/jwt", authToken, userController.getUserFromJwt);

router.get("/:uid", authToken, authorization("admin"), userController.getUser);

router.get(
  "/code/:code_technical",
  authToken,
  authorization("admin"),
  userController.getByCode
);

router.post(
  "/register",
  authToken,
  authorization("admin"),
  userController.register
);

router.post("/login", userController.login);

router.put("/:uid", authToken, userController.update);

router.delete(
  "/:email",
  authToken,
  authorization("admin"),
  userController.remove
);

export default router;
