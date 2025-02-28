import { Router } from "express";

const router = Router();
import * as userController from "../controllers/users.controller.js";
import { authToken, authorization } from "../utils.js";
import { CONSTANTS } from "../config/constants/constansts.js";

router.get("/", authToken, authorization(), userController.getUsers);
router.get("/jwt", authToken, userController.getUserFromJwt);

router.get(
  "/:uid",
  authToken,
  authorization(CONSTANTS.ADMIN),
  userController.getUser
);

router.get(
  "/code/:code_technical",
  authToken,
  authorization(CONSTANTS.ADMIN),
  userController.getByCode
);

router.post(
  "/register",
  authToken,
  authorization(CONSTANTS.ADMIN),
  userController.register
);

router.post("/login", userController.login);

router.put("/:uid", authToken, userController.update);

router.delete(
  "/:email",
  authToken,
  authorization(CONSTANTS.ADMIN),
  userController.remove
);

export default router;
