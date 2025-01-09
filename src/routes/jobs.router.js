import { Router } from "express";

const router = Router();
import * as jobsController from "../controllers/jobs.controller.js";
import { authorization } from "../utils.js";

router.get("/", authorization("premium"), jobsController.getJobs);

router.get("/:id", authorization("premium"), jobsController.getJob);

router.get(
  "/by-name/:name",
  authorization("premium"),
  jobsController.getByName
);

router.post("/create", authorization("premium"), jobsController.create);

router.put("/:id", authorization("premium"), jobsController.update);

router.delete("/:name", authorization("premium"), jobsController.remove);

export default router;
